import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Role } from 'src/common';
import { GetUser, Roles } from 'src/decorator';
import { JwtAuthGuard, RolesGuard } from 'src/guard';
import { UpdateInfoAkunDTO } from '../user/dto/update-info-akun.dto';
import { UpdateEmailUserDTO } from './dto/update-email-user.dto';
import { UpdatePasswordUserDTO } from './dto/update-password-user.dto';
import { ValidatePasswordDTO } from './dto/validate-password.dto';
import { ImageFileFilter } from './filters';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.PENGELOLA_LAUNDRY, Role.PELANGGAN)
  getCurrentUser(@GetUser() user: User) {
    return user;
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: ImageFileFilter,
    }),
  )
  uploadImage(
    @GetUser('id') idPengguna: string,
    @UploadedFile()
    image: Express.Multer.File,
  ) {
    return this.userService.uploadImage(idPengguna, image);
  }

  @Get('daftar-pesanan')
  @Roles(Role.PENGELOLA_LAUNDRY, Role.PELANGGAN)
  async getDaftarPesanan(@GetUser() user: User) {
    return this.userService.getDaftarPesanan(user.id, user.role as Role);
  }

  @Get('detail-pesanan/:id')
  @Roles(Role.PENGELOLA_LAUNDRY, Role.PELANGGAN)
  async getDetailPesanan(@Param('id') id: string) {
    return this.userService.getDetailPesanan(id);
  }

  @Patch('update-profile')
  async updateInformasiAkun(
    @GetUser('id') idPengguna: string,
    @Body() updateInformasiAkunDTO: UpdateInfoAkunDTO,
  ) {
    return this.userService.updateInformasiAkun(
      idPengguna,
      updateInformasiAkunDTO,
    );
  }

  @Post('validate-password')
  async validatePassword(
    @GetUser('password') userPassword: string,
    @Body() inputPassword: ValidatePasswordDTO,
  ) {
    // Validasi password
    const isValid = await this.userService.validatePassword(
      userPassword,
      inputPassword,
    );

    return { isValid };
  }

  @Patch('update-password')
  async updatePasswordUser(
    @GetUser('id') idPengguna: string,
    @Body() updatePasswordUserDTO: UpdatePasswordUserDTO,
  ) {
    return this.userService.updatePassword(idPengguna, updatePasswordUserDTO);
  }

  @Patch('update-email')
  async updateEmailUser(
    @GetUser('id') idPengguna: string,
    @Body() updateEmailUserDTO: UpdateEmailUserDTO,
  ) {
    return this.userService.updateEmail(idPengguna, updateEmailUserDTO);
  }

  // @Get('get-jadwal')
  // async getJadwalOperasional(@GetUser('id') idPengguna: string) {
  //   return this.userService.getJadwalOperasional(idPengguna);
  // }
}
