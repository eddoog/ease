import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common';
import { Roles } from 'src/decorator';
import { JwtAuthGuard, RolesGuard } from 'src/guard';
import { CreatePenilaianDTO } from './dto/create-penilaian.dto';
import { PengelolaLaundryService } from './pengelola-laundry.service';
import { EditStatusPesananDTO } from './dto/edit-status-pesanan.dto';
import { EditPesananDTO } from './dto/edit-pesanan.dto';
import { GetTotalPemasukanDTO } from './dto/get-total-pemasukan.dto';

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

  @Patch('edit-status-pesanan')
  @Roles(Role.PENGELOLA_LAUNDRY)
  async editStatusPesanan(@Body() editStatusPesananDTO: EditStatusPesananDTO) {
    return this.pengelolaLaundryService.editStatusPesanan(editStatusPesananDTO);
  }

  @Patch('edit-pesanan')
  @Roles(Role.PENGELOLA_LAUNDRY)
  async editPesanan(@Body() editPesananDTO: EditPesananDTO) {
    return this.pengelolaLaundryService.editPesanan(editPesananDTO);
  }

  @Get('get-total-pemasukan')
  @Roles(Role.PENGELOLA_LAUNDRY)
  async getTotalPemasukan(@Body() getTotalPemasukanDTO: GetTotalPemasukanDTO) {
    return this.pengelolaLaundryService.getTotalPemasukan(getTotalPemasukanDTO);
  }
}
