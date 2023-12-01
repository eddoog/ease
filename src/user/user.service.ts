import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Role } from 'src/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async uploadImage(image: Express.Multer.File) {
    const uploadedImage = await this.cloudinaryService.uploadImage(image);
    return {
      url: uploadedImage.secure_url,
      publicId: uploadedImage.public_id,
      status: 201,
    };
  }

  async getDaftarPesanan(userId: string, userRole: Role) {
    if (userRole === Role.PELANGGAN) {
      return this.prismaService.pesanan.findMany({
        where: { pelangganId: userId },
      });
    } else if (userRole === Role.PENGELOLA_LAUNDRY) {
      return this.prismaService.pesanan.findMany({
        where: { pengelolaLaundryId: userId },
      });
    }
  }

  async getDetailPesanan(pesananId: string) {
    const pesanan = await this.prismaService.pesanan.findUnique({
      where: {
        id: pesananId,
      },
    });
    return {
      statusCode: 200,
      message: 'Pesanan berhasil diambil',
      data: pesanan,
    };
  }
}
