import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from 'src/common';

export class EditPesananDTO {
  @ApiProperty({
    description: 'id pesanan',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  idPesanan: string;

  @ApiProperty({
    description: 'berat barang',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  berat: number;

  @ApiProperty({
    description: 'harga barang',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  harga: number;

  @ApiProperty({
    description: 'Status dari Pesanan',
    type: String,
  })
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}
