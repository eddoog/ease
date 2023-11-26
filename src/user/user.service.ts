import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
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
}
