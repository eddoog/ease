import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Pesanan } from '@prisma/client';
import { hash, verify } from 'argon2';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Role } from 'src/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateEmailUserDTO } from './dto/update-email-user.dto';
import { UpdateInfoAkunDTO } from './dto/update-info-akun.dto';
import { UpdatePasswordUserDTO } from './dto/update-password-user.dto';

import { Tags } from '@prisma/client';
import { ValidatePasswordDTO } from './dto/validate-password.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  async uploadImage(idPengguna: string, image: Express.Multer.File) {
    const uploadedImage = await this.cloudinaryService.uploadImage(image);
    await this.prismaService.user.update({
      where: { id: idPengguna },
      data: { image: uploadedImage.secure_url },
    });

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

  async updateInformasiAkun(
    idPengguna: string,
    updateInformasiAkunDTO: UpdateInfoAkunDTO,
  ) {
    const pengguna = await this.prismaService.user.findUnique({
      where: { id: idPengguna },
    });

    if (!pengguna) {
      throw new NotFoundException('Pengguna tidak ditemukan');
    }

    const data = {
      name: updateInformasiAkunDTO.name,
      address: updateInformasiAkunDTO.address,
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: idPengguna },
      data: data,
    });

    console.log(this.stringsToTags(updateInformasiAkunDTO.tags));

    // if (pengguna.role === Role.PENGELOLA_LAUNDRY) {
    //   const data = {
    //     // jadwalOperasional: updateInformasiAkunDTO.jadwalOperasional,
    //     tags: this.stringsToTags(updateInformasiAkunDTO.tags) ,

    //   }

    //   const updatedUser = await this.prismaService.pengelolaLaundry.update({
    //     where: { userId: idPengguna },
    //     data: data,
    //   });
    // }

    return {
      statusCode: 200,
      message: 'Profile berhasil diubah',
      data: updatedUser,
    };
  }

  async validatePassword(
    userPassword: string,
    validatePassword: ValidatePasswordDTO,
  ): Promise<boolean> {
    const isPasswordValid = await verify(
      userPassword,
      validatePassword.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Password does not match');
    }
    return isPasswordValid;
  }

  async updatePassword(
    idPengguna: string,
    updatePasswordUserDTO: UpdatePasswordUserDTO,
  ) {
    if (
      updatePasswordUserDTO.password !== updatePasswordUserDTO.confirmPassword
    ) {
      throw new BadRequestException('Password does not match');
    }

    const hashedPassword = await hash(updatePasswordUserDTO.password);
    await this.prismaService.user.update({
      where: { id: idPengguna },
      data: { password: hashedPassword },
    });

    return {
      statusCode: 200,
      message: 'Password berhasil diubah',
    };
  }

  async updateEmail(
    idPengguna: string,
    updateEmailUserDTO: UpdateEmailUserDTO,
  ) {
    const updatedEmail = await this.prismaService.user.update({
      where: { id: idPengguna },
      data: { email: updateEmailUserDTO.email },
    });

    return {
      statusCode: 200,
      message: 'Email berhasil diubah',
      data: updatedEmail,
    };
  }

  stringsToTags(tags: string[]): Tags[] {
    let tagsArray: Tags[] = [];
    tags.forEach((tag) => {
      tagsArray.push(tag as Tags);
    });
    return tagsArray;
  }

}
