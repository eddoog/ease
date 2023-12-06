import { ApiProperty } from '@nestjs/swagger';
import { Days } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

class JadwalOperasional {
  jamBuka : string;
  jamTutup : string;
  hari : Days;
}

export class UpdateJadwalDTO {
  @ApiProperty({
    description: 'Jadwal operasional laundry',
    type: JadwalOperasional,
  })
  @IsNotEmpty()
  jadwalOperasional: JadwalOperasional[];

}
