import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
} from 'class-validator';

export class UpdateInfoAkunDTO {
  @ApiProperty({
    description: 'Username pengguna',
    type: String,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Alamat dari pelanggan atau pengelola laundry',
    type: String,
  })
  @IsString()
  @IsOptional()
  address: string;
}
