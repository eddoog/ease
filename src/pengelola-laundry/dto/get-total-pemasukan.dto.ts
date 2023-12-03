import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetTotalPemasukanDTO {
  @ApiProperty({
    description: 'Id Pengelola Laundry',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  idPengelolaLaundry: string;

  @ApiProperty({
    description: 'Bulan Pemasukan',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  bulan: number;

  @ApiProperty({
    description: 'Tahun Pemasukan',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  tahun: number;
}
