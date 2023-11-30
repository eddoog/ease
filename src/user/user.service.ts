import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/common';

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
}
