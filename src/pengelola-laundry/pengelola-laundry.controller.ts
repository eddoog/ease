import {
  Controller,
  UseGuards,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common';
import { JwtAuthGuard, RolesGuard } from 'src/guard';
import { PengelolaLaundryService } from './pengelola-laundry.service';
import { CreatePenilaianDTO } from './dto/create-penilaian.dto';
import { Roles } from 'src/decorator';

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
    if (!!!createPenilaianDTO.rating) {
      throw new BadRequestException('Rating tidak boleh kosong');
    }

    if (createPenilaianDTO.ulasan.length > 255) {
      throw new BadRequestException(
        'Ulasan terlalu panjang (max 255 karakter)',
      );
    }

    return this.pengelolaLaundryService.createPenilaian(createPenilaianDTO);
  }
}
