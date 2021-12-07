import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationOptionsDto {
  @Min(1, { message: 'Limit должен быть больше нуля' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Limit должен быть числовым' })
  limit?: number = 10;

  @Min(1, { message: 'Страница должна быть не нулевой' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Страница должна быть числовым значением' })
  page?: number = 1;
}
