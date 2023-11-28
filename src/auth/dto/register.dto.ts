import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LoginDTO } from './login.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';

export class RegisterDTO extends LoginDTO {
  @ApiProperty({
    title: 'Nama',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => {
    return value && typeof value === 'string' && value?.trim();
  })
  readonly name: string;

  @ApiProperty({
    title: 'Alamat',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => {
    return value && typeof value === 'string' && value?.trim();
  })
  readonly address: string;

  @ApiProperty({
    title: 'Role',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly role: string;

  @ApiProperty({
    title: 'Deskripsi',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => {
    return value && typeof value === 'string' && value?.trim();
  })
  readonly deskripsi: string;
}
