import { IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PaginationOptionsDto {
  @Transform(({ value }) => (isNumber(value) ? value : 10))
  @Type(() => Number)
  @IsOptional()
  limit?: number = 10;

  @Transform(({ value }) => (isNumber(value) ? value : 1))
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;
}

const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n) && n > 0;
