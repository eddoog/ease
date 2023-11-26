import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategyDTO } from '../dto';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
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
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
