import { Controller } from '@nestjs/common';
import { PengelolaLaundryService } from './pengelola-laundry.service';

@Controller('pengelola-laundry')
export class PengelolaLaundryController {
  constructor(private readonly pengelolaLaundryService: PengelolaLaundryService) {}
}
