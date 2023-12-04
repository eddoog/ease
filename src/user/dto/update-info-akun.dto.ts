import { ApiProperty } from '@nestjs/swagger';
import { Days } from '@prisma/client';
import { IsString, IsOptional } from 'class-validator';
import { Tags } from 'src/common';

class JadwalOperasional {
  jamBuka: string;
  jamTutup: string;
  hari: Days;
}

export class UpdateInfoAkunDTO {
  @ApiProperty({
    description: 'Username pengguna',
    type: String,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Alamat dari pelanggan atau pengelola laundry',
    type: String,
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'Deskripsi laundry',
    type: String,
  })
  @IsString()
  @IsOptional()
  deskripsi: string;

  @ApiProperty({
    description: 'Jadwal operasional laundry',
    type: JadwalOperasional,
  })
  @IsOptional()
  jadwalOperasional: JadwalOperasional[];

  @ApiProperty({
    description: 'Service yang disediakan laundry',
    enum: Tags,
  })
  @IsOptional()
  tags: Tags[];
}
