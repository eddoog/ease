import { IsNotEmpty, IsString } from 'class-validator';

export class CancelPesananDTO {
  @IsNotEmpty()
  @IsString()
  idPesanan: string;
}
