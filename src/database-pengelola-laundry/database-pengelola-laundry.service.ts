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
    if (!!!filter) {
      const pengelolaLaundry = await this.prismaService.user.findMany({
        where: {
          name: {
            contains: keyword,
          },
        },
      });
      if (!!!pengelolaLaundry) {
        throw new BadRequestException('Pengelola laundry tidak ditemukan');
      }
      return {
        statusCode: 200,
        message: 'Success finding keyword',
        data: pengelolaLaundry,
      };
    }

    const pengelolaLaundry = await this.prismaService.pengelolaLaundry.findMany(
      {
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
      },
    );

    if (!!!pengelolaLaundry) {
      throw new BadRequestException('Pengelola laundry tidak ditemukan');
    }

    return {
      statusCode: 200,
      message: 'Success Filtering',
      data: pengelolaLaundry,
    };
  }
}
