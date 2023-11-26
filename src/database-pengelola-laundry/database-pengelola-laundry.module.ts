import { Module } from '@nestjs/common';
import { DatabasePengelolaLaundryService } from './database-pengelola-laundry.service';
import { DatabasePengelolaLaundryController } from './database-pengelola-laundry.controller';

@Module({
  controllers: [DatabasePengelolaLaundryController],
  providers: [DatabasePengelolaLaundryService],
})
export class DatabasePengelolaLaundryModule {}
