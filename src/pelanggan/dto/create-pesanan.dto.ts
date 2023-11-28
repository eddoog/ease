import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreatePesananDTO {
  @ApiProperty({
    title: 'ID Pengelola Laundry',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  idPengelolaLaundry: string;

  @ApiProperty({
    title: 'Waktu Penyelesaian',
    type: Date,
  })
  @IsNotEmpty()
  @IsDateString()
  waktuPenyelesaian: Date;
}
