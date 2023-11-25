import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto';
import { ResponseDTO } from 'src/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() dto: LoginDTO): Promise<ResponseDTO> {
    return this.authService.login(dto);
  }

  @Post()
  register(@Body() dto: RegisterDTO): Promise<ResponseDTO> {
    return this.authService.register(dto);
  }
}
