import { Controller } from '@nestjs/common';
import { PelangganService } from './pelanggan.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pelanggan')
@Controller('pelanggan')
export class PelangganController {
  constructor(private readonly pelangganService: PelangganService) {}
}
