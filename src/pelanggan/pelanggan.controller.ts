import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common';
import { GetUser, Roles } from 'src/decorator';
import { PelangganService } from './pelanggan.service';
import { CancelPesananDTO, CreatePesananDTO } from './dto';
import { JwtAuthGuard, RolesGuard } from 'src/guard';

@ApiTags('pelanggan')
@Controller('pelanggan')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PelangganController {
  constructor(private readonly pelangganService: PelangganService) {}

  @Post('create-pesanan')
  @Roles(Role.PELANGGAN)
  createPesanan(
    @GetUser('id') id: string,
    @Body() createPesananDto: CreatePesananDTO,
  ) {
    return this.pelangganService.createPesanan(id, createPesananDto);
  }

  @Delete('cancel-pesanan')
  @Roles(Role.PELANGGAN)
  cancelPesanan(
    @GetUser('id') idPelanggan: string,
    @Body() cancelPesananDto: CancelPesananDTO,
  ) {
    return this.pelangganService.cancelPesanan(idPelanggan, cancelPesananDto);
  }
}
