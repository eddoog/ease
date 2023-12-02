import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategyDTO } from '../auth/dto';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: configService.get('NODE_ENV') === 'development',
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtStrategyDTO): Promise<Omit<User, 'password'>> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: {
        email: payload.email,
      },
      include: {
        Pelanggan: {
          select: {
            Pesanan: {
              orderBy: {
                waktuPesanan: 'desc',
              },
            },
          },
        },
        PengelolaLaundry: {
          select: {
            Pesanan: {
              orderBy: {
                waktuPesanan: 'desc',
              },
            },
            deskripsi: true,
            jadwalOperasional: true,
            Pemasukan: true,
            Penilaian: true,
            tags: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    delete user.password;

    if (user.role === 'PELANGGAN') {
      user['pesanan'] = user.Pelanggan.Pesanan;
    } else if (user.role === 'PENGELOLA_LAUNDRY') {
      user['pesanan'] = user.PengelolaLaundry.Pesanan;
      user['deskripsi'] = user.PengelolaLaundry.deskripsi;
      user['jadwalOperasional'] = user.PengelolaLaundry.jadwalOperasional;
      user['pemasukan'] = user.PengelolaLaundry.Pemasukan;
      user['penilaian'] = user.PengelolaLaundry.Penilaian;
      user['tags'] = user.PengelolaLaundry.tags;
    }

    delete user.Pelanggan;
    delete user.PengelolaLaundry;

    return user;
  }
}
