import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePenilaianDTO } from './dto/create-penilaian.dto';
import { Penilaian } from '@prisma/client';

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
  
}
