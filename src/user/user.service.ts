import { Injectable } from '@nestjs/common';
import { Pesanan } from '@prisma/client';
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
    let pesanan: Pesanan[];

    if (userRole === Role.PELANGGAN) {
      pesanan = await this.prismaService.pesanan.findMany({
        where: { pelangganId: userId },
      });
    } else if (userRole === Role.PENGELOLA_LAUNDRY) {
      pesanan = await this.prismaService.pesanan.findMany({
        where: { pengelolaLaundryId: userId },
      });
    }

    return {
      statusCode: 200,
      message: 'Success',
      data: pesanan,
    };
  }
}
