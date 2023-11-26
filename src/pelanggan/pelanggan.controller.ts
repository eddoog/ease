import { Controller } from '@nestjs/common';
import { PelangganService } from './pelanggan.service';

@Controller('pelanggan')
export class PelangganController {
  constructor(private readonly pelangganService: PelangganService) {}
}
