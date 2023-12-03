import { BadRequestException, Injectable } from '@nestjs/common';
import { Tags } from 'src/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterDTO } from './dto/filter.dto';

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

  async filterPengelolaLaundry(filterDTO: FilterDTO) {
    const keyword = filterDTO.keyword;
    const filter = filterDTO.filters.split(',', Object.keys(Tags).length);
    const filterAsTags = filter.map((tag) => Tags[tag as keyof typeof Tags]);
    let pengelolaLaundry;
    if (!!!filter) {
      pengelolaLaundry = await this.prismaService.pengelolaLaundry.findMany({
        where: {
          user: {
            name: {
              contains: keyword,
            },
          },
        },
        include: {
          user: true,
        },
      });
    } else if (!!!keyword) {
      pengelolaLaundry = await this.prismaService.pengelolaLaundry.findMany({
        where: {
          tags: {
            hasEvery: filterAsTags,
          },
        },
      });
    } else {
      pengelolaLaundry = await this.prismaService.pengelolaLaundry.findMany({
        where: {
          tags: {
            hasEvery: filterAsTags,
          },
          user: {
            name: {
              contains: keyword,
            },
          },
        },
        include: {
          user: true,
        },
      });
    }

    if (!!!pengelolaLaundry) {
      throw new BadRequestException('Pengelola laundry tidak ditemukan');
    }

    return {
      statusCode: 200,
      message: 'Success Filtering',
      data: pengelolaLaundry,
    };
  }

  async findAllPengelolaLaundry() {
    const pengelolaLaundry = await this.prismaService.pengelolaLaundry.findMany(
      {
        include: {
          Penilaian: true,
          user: {
            select: {
              name: true,
              address: true,
            },
          },
        },
      },
    );

    if (!!!pengelolaLaundry) {
      throw new BadRequestException('Pengelola laundry tidak ditemukan');
    }

    const pengelolaLaundryWithRatings = pengelolaLaundry.map((pengelola) => {
      const rating = pengelola.Penilaian.reduce(
        (sum, penilaian) => sum + penilaian.nilai / pengelola.Penilaian.length,
        0,
      );

      const { name, address } = pengelola.user;

      delete pengelola.Penilaian;
      delete pengelola.user;
      delete pengelola.deskripsi;

      return {
        ...pengelola,
        name,
        rating,
        address,
      };
    });

    return {
      statusCode: 200,
      message: 'Success',
      data: pengelolaLaundryWithRatings,
    };
  }
}
