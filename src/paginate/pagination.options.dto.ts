import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationOptionsDto {
  @Min(1)
  @IsOptional()
  @IsNumber()
  limit: number;

  @Min(1)
  @IsOptional()
  @IsNumber()
  page: number;
}
