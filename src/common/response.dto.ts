import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO {
  @ApiProperty({ type: Number })
  statusCode: number;

  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ type: Object })
  data: any;
}
