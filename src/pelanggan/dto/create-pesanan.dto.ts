import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePesananDTO {
  @IsNotEmpty()
  @IsString()
  idPengelolaLaundry: string;
}
