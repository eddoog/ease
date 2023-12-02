import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
} from 'class-validator';

export class UpdateEmailUserDTO {
    @ApiProperty({
    description: 'Email pengguna',
    type: String,
    })
    @IsString()
    @IsEmail()
    email: string;
}
