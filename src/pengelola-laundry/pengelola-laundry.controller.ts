import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from 'src/guard';
import { PengelolaLaundryService } from './pengelola-laundry.service';

@ApiTags('pengelola-laundry')
@Controller('pengelola-laundry')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PengelolaLaundryController {
  constructor(
    private readonly pengelolaLaundryService: PengelolaLaundryService,
  ) {}
}
