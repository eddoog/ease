import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class JwtStrategyDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    title: 'sub',
    type: String,
  })
  readonly sub: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    title: 'email',
    type: String,
  })
  readonly email: string;
}
