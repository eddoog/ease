import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PelangganModule } from './pelanggan/pelanggan.module';
import { PengelolaLaundryModule } from './pengelola-laundry/pengelola-laundry.module';
import { DatabasePengelolaLaundryModule } from './database-pengelola-laundry/database-pengelola-laundry.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CloudinaryModule,
    UserModule,
    AuthModule,
    PelangganModule,
    PengelolaLaundryModule,
    DatabasePengelolaLaundryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
