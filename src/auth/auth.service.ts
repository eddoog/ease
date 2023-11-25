import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { hash, verify } from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Role } from '@prisma/client';
import { ResponseDTO } from 'src/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginDTO): Promise<ResponseDTO> {
    const { email, password } = dto;

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await verify(user.password, password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    return {
      statusCode: 200,
      message: 'Success',
      data: {
        accessToken: '',
      },
    };
  }

  async register(dto: RegisterDTO) {
    const role = Role[dto.role.toUpperCase() as keyof typeof Role];
    const hashedPassword = await hash(dto.password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          name: dto.name,
          role: role,
          ...(dto.address && { address: dto.address }),
          ...(dto.image && { image: dto.image }),
        },
      });

      switch (role) {
        case Role.PELANGGAN:
          await this.prismaService.pelanggan.create({
            data: {
              userId: user.id,
            },
          });
          break;
        case Role.PENGELOLA_LAUNDRY:
          await this.prismaService.pengelolaLaundry.create({
            data: {
              userId: user.id,
              ...(dto.deskripsi && { image: dto.deskripsi }),
            },
          });
          break;
        default:
          break;
      }
    } catch (error) {
      if (!(error instanceof PrismaClientKnownRequestError)) return error;
      if (error.code === 'P2002') {
        throw new ForbiddenException('User already exists');
      }
    }

    return {
      accessToken: '',
    };
  }

  async signToken(userId: string, email: string) {
    const payload = {
      userId,
      email,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '60m',
      secret: this.configService.get('JWT_SECRET'),
    });

    return token;
  }

  async createPelanggan() {
    return;
  }
}
