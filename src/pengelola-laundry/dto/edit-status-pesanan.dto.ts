import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StatusPesanan } from 'src/common';

export class EditStatusPesananDTO {
  @ApiProperty({
    description: 'ID dari Pesanan',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  idPesanan: string;

  @ApiProperty({
    description: 'Status dari Pesanan',
    type: String,
  })
  @IsNotEmpty()
  @IsEnum(StatusPesanan)
  status: StatusPesanan;
}
