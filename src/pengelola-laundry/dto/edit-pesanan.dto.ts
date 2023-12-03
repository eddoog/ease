import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
    type: Number,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  berat: number;

  @ApiProperty({
    description: 'harga barang',
    type: Number,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  harga: number;
}
