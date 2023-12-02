import {
  Controller,
  Get,
  Param,
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
    @UploadedFile()
    image: Express.Multer.File,
  ) {
    return this.userService.uploadImage(image);
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
}
