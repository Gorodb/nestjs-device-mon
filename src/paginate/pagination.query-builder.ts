import { QueryBuilder, Repository } from 'typeorm';
import {
  PaginationOptionsDto,
  PaginationOrderOptionsDto,
} from './pagination.options.dto';
import { PaginationResultInterface } from './pagination.results.interface';
import { Pagination } from './pagination';
import { DeviceTypes } from '../device-types/device-types.entity';

export const paginationQueryBuilder = (
  alias: string,
  repository: Repository<any>,
  paginationOptions: PaginationOptionsDto,
  orderOptions?: PaginationOrderOptionsDto,
  searchOptions?: { fields: string[]; search: string },
) => {
  const queryBuilder = repository.createQueryBuilder(alias);

  if (searchOptions.search) {
    const { fields, search } = searchOptions;
    const query = fields
      .map((key) => `LOWER(${alias}.${key}) LIKE LOWER(:search)`)
      .join(' OR ');
    queryBuilder.where(`(${query})`, { search: `%${search}%` });
  }

  if (orderOptions) {
    const { field, order } = orderOptions;
    queryBuilder.orderBy(`${alias}.${field}`, order);
  } else {
    queryBuilder.orderBy(`${alias}.created`, 'DESC');
  }

  queryBuilder
    .skip((paginationOptions.page - 1) * paginationOptions.limit)
    .take(paginationOptions.limit);
  return queryBuilder;
};

export const paginate = async <T>(
  queryBuilder,
  options: PaginationOptionsDto,
): Promise<Pagination<T>> => {
  const [results, total] = await queryBuilder.getManyAndCount();
  return new Pagination<T>({
    results,
    total,
    ...options,
  });
};

class PaginationQueryBuilder {
  private alias: string;
  private repository: Repository<any>;
  public queryBuilder: any;
  constructor(alias, repository) {
    this.alias = alias;
    this.repository = repository;
    this.queryBuilder = repository.createQueryBuilder(alias);
  }

  public setSearchOptions(searchOptions?: { fields: string[]; search: string }) {
    const { fields, search } = searchOptions;
    const query = fields
      .map((key) => `LOWER(${this.alias}.${key}) LIKE LOWER(:search)`)
      .join(' OR ');
    this.queryBuilder.where(`(${query})`, { search: `%${search}%` });
  }
}
