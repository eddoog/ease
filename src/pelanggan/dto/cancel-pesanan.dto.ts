import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CancelPesananDTO {
  @ApiProperty({
    title: 'ID Pesanan',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly idPesanan: string;
}
