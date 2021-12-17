import { IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export enum OrderEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

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

export class PaginationOrderOptionsDto {
  field: string;
  order?: OrderEnum = OrderEnum.DESC;
}

const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n) && n > 0;
