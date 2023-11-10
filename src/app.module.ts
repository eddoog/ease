import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, CloudinaryModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
