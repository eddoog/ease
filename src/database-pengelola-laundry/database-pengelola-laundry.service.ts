import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DatabasePengelolaLaundryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPengelolaLaundry(id: string) {
    const pengelolaLaundry =
      await this.prismaService.pengelolaLaundry.findUnique({
        where: {
          userId: id,
        },
      });

    if (!!!pengelolaLaundry) {
      throw new BadRequestException('Pengelola laundry tidak ditemukan');
    }

    return {
      statusCode: 200,
      message: 'Success',
      data: pengelolaLaundry,
    };
  }
}
