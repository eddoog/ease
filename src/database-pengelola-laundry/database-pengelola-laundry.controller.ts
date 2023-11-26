import { Controller } from '@nestjs/common';
import { DatabasePengelolaLaundryService } from './database-pengelola-laundry.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('database-pengelola-laundry')
@Controller('database-pengelola-laundry')
export class DatabasePengelolaLaundryController {
  constructor(
    private readonly databasePengelolaLaundryService: DatabasePengelolaLaundryService,
  ) {}
}
