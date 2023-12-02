import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreatePenilaianDTO {
  @ApiProperty({
    description: 'ID dari Pengelola Laundry',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  idPengelolaLaundry: string;

  @ApiProperty({
    description: 'Rating yang diberikan pelanggan',
    type: Number,
    minimum: 1,
    maximum: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty({
    description: 'Review yang ditulis pelanggan',
    type: String,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  ulasan?: string;
}
