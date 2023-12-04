import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePenilaianDTO } from './dto/create-penilaian.dto';
import { Penilaian, Status } from '@prisma/client';
import { EditStatusPesananDTO } from './dto/edit-status-pesanan.dto';
import { StatusPesanan } from 'src/common';
import { EditPesananDTO } from './dto/edit-pesanan.dto';
import { GetTotalPemasukanDTO } from './dto/get-total-pemasukan.dto';

@Injectable()
export class PengelolaLaundryService {
  constructor(private prismaService: PrismaService) {}

  async createPenilaian(createPenilaianDTO: CreatePenilaianDTO) {
    const { idPengelolaLaundry, rating, ulasan } = createPenilaianDTO;

    if (!!!rating) {
      throw new BadRequestException('Rating tidak boleh kosong');
    }

    if (ulasan.length > 255) {
      throw new BadRequestException(
        'Ulasan terlalu panjang (max 255 karakter)',
      );
    }

    // Check if the laundry exists before creating the rating
    const pengelolaLaundry = await this.getPengelolaLaundry(idPengelolaLaundry);

    if (!!!pengelolaLaundry) {
      throw new BadRequestException('Pengelola Laundry tidak ditemukan');
    }

    let penilaian: Penilaian;
    try {
      penilaian = await this.prismaService.penilaian.create({
        data: {
          nilai: rating,
          ulasan: ulasan,
          pengelolaLaundryId: idPengelolaLaundry,
        },
      });
    } catch (error) {
      throw new BadRequestException('Terjadi kesalahan saat membuat penilaian');
    }

    return {
      statusCode: 201,
      message: 'Success',
      data: penilaian,
    };
  }

  // Function to get Pengelola Laundry by ID
  private async getPengelolaLaundry(idPengelolaLaundry: string) {
    const laundry = await this.prismaService.pengelolaLaundry.findUnique({
      where: { userId: idPengelolaLaundry },
    });

    if (!!!laundry) {
      throw new BadRequestException('Pengelola Laundry tidak ditemukan');
    }

    return {
      statusCode: 200,
      message: 'Success',
      data: laundry,
    };
  }

  async editStatusPesanan(editStatusPesananDTO: EditStatusPesananDTO) {
    const { idPesanan, status } = editStatusPesananDTO;

    const pesanan = await this.prismaService.pesanan.findUnique({
      where: {
        id: idPesanan,
      },
    });

    if (!!!pesanan) {
      throw new BadRequestException('Pesanan tidak ditemukan');
    }
    //Tidak bisa mengubah status ketika sudah selesai
    if (pesanan.status == StatusPesanan.SELESAI) {
      throw new BadRequestException(
        'Pesanan sudah selesai, tidak bisa diubah lagi',
      );
    }
    //Bisa ubah status saat berat dan harga barang sudah diisi
    if (
      !!!pesanan.berat &&
      pesanan.status !== StatusPesanan.MENUNGGU_KONFIRMASI
    ) {
      throw new BadRequestException(
        'Isi berat dan harga barang untuk bisa ubah status',
      );
    }

    try {
      //Pesanan ditolak
      if (status == StatusPesanan.DITOLAK) {
        await this.prismaService.pesanan.delete({
          where: {
            id: idPesanan,
          },
        });

        return {
          statusCode: 204,
          message: 'Success',
          data: {},
        };
      }
      //Pesanan selesai
      if (status == StatusPesanan.SELESAI) {
        const updatedPesanan = await this.prismaService.pesanan.update({
          data: {
            status: StatusPesanan.SELESAI,
          },
          where: {
            id: pesanan.id,
          },
        });

        if (!!!updatedPesanan) {
          throw new BadRequestException('Gagal mengubah status pesanan');
        }

        const pemasukan = await this.prismaService.pemasukan.create({
          data: {
            nominal: updatedPesanan.harga,
            pengelolaLaundryId: updatedPesanan.pengelolaLaundryId,
          },
        });

        if (!!!pemasukan) {
          throw new BadRequestException('Gagal menambahkan pemasukan');
        }

        return {
          statusCode: 200,
          message: 'Success',
          data: updatedPesanan,
        };
        // Pesanan diterima, status akan pending
      } else {
        const updatedPesanan = await this.prismaService.pesanan.update({
          data: {
            status: status,
          },
          where: {
            id: pesanan.id,
          },
        });

        if (!!!updatedPesanan) {
          throw new BadRequestException('Gagal mengubah status pesanan');
        }

        return {
          statusCode: 200,
          message: 'Success',
          data: updatedPesanan,
        };
      }
    } catch (error) {
      throw new BadRequestException(
        'Terjadi kesalahan saat mengubah status pesanan',
      );
    }
  }

  async editPesanan(editPesananDTO: EditPesananDTO) {
    const { idPesanan, berat, harga } = editPesananDTO;

    const pesanan = await this.prismaService.pesanan.findUnique({
      where: {
        id: idPesanan,
      },
    });

    if (!!!pesanan) {
      throw new BadRequestException('Pesanan tidak ditemukan');
    }

    try {
      const updatedPesanan = await this.prismaService.pesanan.update({
        data: {
          status: Status.DIPROSES,
          berat: berat,
          harga: harga,
        },
        where: {
          id: pesanan.id,
        },
      });

      if (!!!updatedPesanan) {
        throw new BadRequestException('Gagal mengubah pesanan');
      }

      return {
        statusCode: 200,
        message: 'Success',
        data: updatedPesanan,
      };
    } catch (error) {
      throw new BadRequestException('Terjadi kesalahan saat mengubah pesanan');
    }
  }

  async getTotalPemasukan(getTotalPemasukanDTO: GetTotalPemasukanDTO) {
    const { idPengelolaLaundry, bulan, tahun } = getTotalPemasukanDTO;

    const pengelolaLaundry = await this.getPengelolaLaundry(idPengelolaLaundry);

    if (!!!pengelolaLaundry) {
      throw new BadRequestException('Pengelola Laundry tidak ditemukan');
    }
    if (bulan > 12) {
      throw new BadRequestException('Tidak boleh bulan lebih dari 12');
    }

    let nextMonth = bulan + 1;
    let nextYear = tahun;

    if (nextMonth == 13) {
      nextMonth = 1;
      nextYear++;
    }

    try {
      const pemasukanList = await this.prismaService.pemasukan.findMany({
        where: {
          pengelolaLaundryId: idPengelolaLaundry,
          Date: {
            gte: new Date(`${tahun}-${bulan}-01 00:00:00.000Z`),
            lt: new Date(`${nextYear}-${nextMonth}-01 00:00:00.000Z`),
          },
        },
        orderBy: {
          Date: 'asc',
        },
      });

      let totalPemasukan = 0;
      pemasukanList.forEach((pemasukan) => {
        totalPemasukan += pemasukan.nominal;
      });

      return {
        statusCode: 200,
        message: 'Success',
        data: {
          pemasukanList,
          totalPemasukan,
        },
      };
    } catch (error) {
      throw new BadRequestException(
        'Terjadi kesalahan saat mengambil data pemasukan',
      );
    }
  }
}
