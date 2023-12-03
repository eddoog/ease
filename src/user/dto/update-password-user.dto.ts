

import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
} from 'class-validator';

export class UpdatePasswordUserDTO {
    @ApiProperty({
    description: 'Password pengguna',
    type: String,
    })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;

    @ApiProperty({
    description: 'Konfirmasi password pengguna',
    type: String,
    })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    confirmPassword: string;
}