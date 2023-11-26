import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto';
import { ResponseDTO } from 'src/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageFileFilter } from 'src/user/filters';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDTO): Promise<ResponseDTO> {
    return this.authService.login(dto);
  }

  @Post('register')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: ImageFileFilter,
    }),
  )
  register(
    @Body() registerDTO: RegisterDTO,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<ResponseDTO> {
    return this.authService.register(registerDTO, image);
  }
}
