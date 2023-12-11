import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetTotalPemasukanDTO {

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
