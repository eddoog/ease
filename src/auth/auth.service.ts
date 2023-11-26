import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { hash, verify } from 'argon2';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ResponseDTO } from 'src/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDTO, RegisterDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async login(dto: LoginDTO): Promise<ResponseDTO> {
    const { email, password } = dto;

    const user = await this.findUser(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await verify(user.password, password);

    if (!isPasswordValid) {
      throw new BadRequestException('Password does not match');
    }

    const accessToken = await this.signToken(user.id, user.email);

    return {
      statusCode: 200,
      message: 'Success',
      data: {
        accessToken: accessToken,
      },
    };
  }

  async register(dto: RegisterDTO, image: Express.Multer.File) {
    const user = await this.findUser(dto.email);

    if (!!user) {
      throw new BadRequestException('User already exist');
    }

    const role = Role[dto.role.toUpperCase() as keyof typeof Role];
    const hashedPassword = await hash(dto.password);

    const stringifiedImage = image ? await this.uploadImage(image) : undefined;

    const newUser = await this.createUser(
      dto,
      hashedPassword,
      role,
      stringifiedImage,
    );

    const accessToken = await this.signToken(newUser.id, newUser.email);

    return {
      statusCode: 201,
      message: "User's account has been created",
      data: {
        accessToken: accessToken,
      },
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

  async uploadImage(image: Express.Multer.File) {
    const uploadedImage = await this.cloudinaryService.uploadImage(image);
    return uploadedImage;
  }

  async findUser(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async createUser(
    dto: RegisterDTO,
    password: string,
    role: Role,
    image: UploadApiResponse | UploadApiErrorResponse,
  ) {
    return await this.prismaService.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email: dto.email,
          password: password,
          name: dto.name,
          role: role,
          image: image?.secure_url,
          ...(dto.address && { address: dto.address }),
        },
      });

      switch (role) {
        case Role.PELANGGAN:
          await prisma.pelanggan.create({
            data: {
              userId: user.id,
            },
          });
          break;
        case Role.PENGELOLA_LAUNDRY:
          await prisma.pengelolaLaundry.create({
            data: {
              userId: user.id,
              ...(dto.deskripsi && { deskripsi: dto.deskripsi }),
            },
          });
          break;
        default:
          break;
      }

      return user;
    });
  }
}
