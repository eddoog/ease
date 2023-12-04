import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DatabasePengelolaLaundryService } from './database-pengelola-laundry.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator';
import { Role } from 'src/common';
import { JwtAuthGuard, RolesGuard } from 'src/guard';
import { FilterDTO } from './dto/filter.dto';

@ApiTags('database-pengelola-laundry')
@Controller('database-pengelola-laundry')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DatabasePengelolaLaundryController {
  constructor(
    private readonly databasePengelolaLaundryService: DatabasePengelolaLaundryService,
  ) {}

  // @Get(':id')
  // @Roles(Role.PELANGGAN, Role.PENGELOLA_LAUNDRY)
  // async getPengelolaLaundry(@Param('id') id: string) {
  //   return this.databasePengelolaLaundryService.getPengelolaLaundry(id);
  // }

  // @Post('filter')
  // @Roles(Role.PELANGGAN)
  // async filterPengelolaLaundry(@Body() filterDTO: FilterDTO) {
  //   return this.databasePengelolaLaundryService.filterPengelolaLaundry(
  //     filterDTO,
  //   );
  // }

  @Get()
  @Roles(Role.PELANGGAN)
  async findAllPengelolaLaundry(){
    return this.databasePengelolaLaundryService.findAllPengelolaLaundry();
  }
}
