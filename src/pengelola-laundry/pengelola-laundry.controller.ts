import { Controller } from '@nestjs/common';
import { PengelolaLaundryService } from './pengelola-laundry.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pengelola-laundry')
@Controller('pengelola-laundry')
export class PengelolaLaundryController {
  constructor(
    private readonly pengelolaLaundryService: PengelolaLaundryService,
  ) {}
}
