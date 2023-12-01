import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CancelPesananDTO, CreatePesananDTO } from './dto';
import { Pesanan } from '@prisma/client';

@Injectable()
export class PelangganService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPesanan(id: string, createPesananDto: CreatePesananDTO) {
    const { idPengelolaLaundry, waktuPenyelesaian } = createPesananDto;

    if (id === idPengelolaLaundry) {
      throw new BadRequestException(
        'Tidak dapat membuat pesanan untuk diri sendiri',
      );
    }

    if (new Date(waktuPenyelesaian) < new Date()) {
      throw new BadRequestException(
        'Waktu penyelesaian tidak dapat lebih kecil dari waktu saat ini',
      );
    }

    const pengelolaLaundry = await this.getPengelolaLaundry(idPengelolaLaundry);

    if (!!!pengelolaLaundry) {
      throw new BadRequestException('Pengelola laundry tidak ditemukan');
    }

    const pesananSedangBerlangsung = await this.getPesananBerlangsung(id);

    if (!!pesananSedangBerlangsung) {
      throw new BadRequestException(
        'Pesanan sedang berlangsung, silahkan tunggu sampai pesanan selesai',
      );
    }

    let pesanan: Pesanan;
    try {
      pesanan = await this.prismaService.pesanan.create({
        data: {
          pelangganId: id,
          pengelolaLaundryId: idPengelolaLaundry,
          waktuPenyelesaian: waktuPenyelesaian,
        },
      });
    } catch (error) {
      throw new BadRequestException('Terjadi kesalahan saat membuat pesanan');
    }

    return {
      statusCode: 201,
      message: 'Success',
      data: pesanan,
    };
  }

  async cancelPesanan(idPelanggan: string, cancelPesananDto: CancelPesananDTO) {
    const { idPesanan } = cancelPesananDto;

    const pesanan = await this.getPesananById(idPesanan);

    if (!!!pesanan) {
      throw new BadRequestException('Pesanan tidak ditemukan');
    }

    if (pesanan.pelangganId !== idPelanggan) {
      throw new ForbiddenException(
        'Anda tidak memiliki akses untuk membatalkan pesanan ini',
      );
    }

    if (pesanan.status !== 'MENUNGGU_KONFIRMASI') {
      throw new BadRequestException('Pesanan tidak dapat dibatalkan');
    }

    try {
      await this.prismaService.pesanan.delete({
        where: {
          id: idPesanan,
        },
      });
    } catch (error) {
      throw new BadRequestException(
        'Terjadi kesalahan saat membatalkan pesanan',
      );
    }

    return {
      statusCode: 200,
      message: 'Success',
      data: {
        idPesanan: idPesanan,
      },
    };
  }

  async getPesananById(idPesanan: string) {
    const pesanan = await this.prismaService.pesanan.findUnique({
      where: {
        id: idPesanan,
      },
    });

    return pesanan;
  }

  async getPesananBerlangsung(idPelanggan: string) {
    const pesanan = await this.prismaService.pesanan.findFirst({
      where: {
        pelangganId: idPelanggan,
        status: {
          not: 'SELESAI',
        },
      },
    });

    return pesanan;
  }

  async getPengelolaLaundry(id: string) {
    const pengelolaLaundry =
      await this.prismaService.pengelolaLaundry.findUnique({
        where: {
          userId: id,
        },
      });

    return pengelolaLaundry;
  }
}
