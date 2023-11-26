import { Controller } from '@nestjs/common';
import { DatabasePengelolaLaundryService } from './database-pengelola-laundry.service';

@Controller('database-pengelola-laundry')
export class DatabasePengelolaLaundryController {
  constructor(private readonly databasePengelolaLaundryService: DatabasePengelolaLaundryService) {}
}
