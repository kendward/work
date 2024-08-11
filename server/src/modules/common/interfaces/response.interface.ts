import { ApiProperty } from '@nestjs/swagger';

export class ResponseOut<T> {
  @ApiProperty({
    example: 200,
    description: 'HTTP Status Code',
  })
  statusCode: number;
  @ApiProperty({
    example: 'success',
    description: 'Status of the response',
  })
  status: string;
  @ApiProperty({
    example: 'Message of the response',
    description: 'Message of the response',
  })
  message: string;

  @ApiProperty({
    example: {},
    description: 'Data of the response',
  })
  data?: T;

  @ApiProperty({
    example: {},
    description: 'Additional information of the response',
  })
  additionalInfo?: Record<string, any>;
}
