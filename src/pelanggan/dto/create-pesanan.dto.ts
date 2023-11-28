import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreatePesananDTO {
  @IsNotEmpty()
  @IsString()
  idPengelolaLaundry: string;

  @IsNotEmpty()
  @IsDateString()
  waktuPenyelesaian: Date;
}
