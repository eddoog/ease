import { Module } from '@nestjs/common';
import { PengelolaLaundryService } from './pengelola-laundry.service';
import { PengelolaLaundryController } from './pengelola-laundry.controller';

@Module({
  controllers: [PengelolaLaundryController],
  providers: [PengelolaLaundryService],
})
export class PengelolaLaundryModule {}
