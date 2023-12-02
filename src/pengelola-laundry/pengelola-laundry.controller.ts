import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common';
import { Roles } from 'src/decorator';
import { JwtAuthGuard, RolesGuard } from 'src/guard';
import { CreatePenilaianDTO } from './dto/create-penilaian.dto';
import { PengelolaLaundryService } from './pengelola-laundry.service';

@ApiTags('pengelola-laundry')
@Controller('pengelola-laundry')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PengelolaLaundryController {
  constructor(
    private readonly pengelolaLaundryService: PengelolaLaundryService,
  ) {}

  @Post('create-penilaian')
  @Roles(Role.PELANGGAN)
  async createPenilaian(@Body() createPenilaianDTO: CreatePenilaianDTO) {
    return this.pengelolaLaundryService.createPenilaian(createPenilaianDTO);
  }
}
