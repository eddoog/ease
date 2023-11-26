import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageFileFilter } from './filters';
import { JwtAuthGuard } from 'src/guard';
import { User } from '@prisma/client';
import { GetUser, Roles } from 'src/decorator';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guard/roles.guard';
import { Role } from 'src/common';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.PENGELOLA_LAUNDRY, Role.PELANGGAN)
  getCurrentUser(@GetUser() user: User) {
    console.log(Role.PELANGGAN);
    return user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
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
}
