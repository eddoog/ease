import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class FilterDTO {
  @ApiProperty({
    title: 'Keyword',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly keyword: string;

  @ApiProperty({
    title: 'Filters',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly filters: string;
}
