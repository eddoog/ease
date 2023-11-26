import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DatabasePengelolaLaundryService } from './database-pengelola-laundry.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator';
import { Role } from 'src/common';
import { JwtAuthGuard, RolesGuard } from 'src/guard';

@ApiTags('database-pengelola-laundry')
@Controller('database-pengelola-laundry')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DatabasePengelolaLaundryController {
  constructor(
    private readonly databasePengelolaLaundryService: DatabasePengelolaLaundryService,
  ) {}

  @Get(':id')
  @Roles(Role.PELANGGAN, Role.PENGELOLA_LAUNDRY)
  async getPengelolaLaundry(@Param('id') id: string) {
    return this.databasePengelolaLaundryService.getPengelolaLaundry(id);
  }
}
