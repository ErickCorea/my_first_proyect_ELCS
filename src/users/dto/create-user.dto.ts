import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true, example: 'ecorea@empresa.com' })
  email: string;

  @ApiProperty({ required: true, example: 'Erick Corea' })
  name: string;

  @ApiProperty({ required: true, example: 'erickcorea123' })
  password: string;

  @ApiProperty({ required: true, example: 1, description: 'ID del tenant' })
  tenantId: number;
}