import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';
import { Status } from 'src/common';

export class EditStatusPesananDTO{
  @ApiProperty({
    description: 'ID dari Pesanan',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  idPesanan : String;
  
  @ApiProperty({
    description: 'Status dari Pesanan',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  status : Status;  
}
