import { Repository } from 'typeorm';
import {
  PaginationOptionsDto,
  PaginationOrderOptionsDto,
} from './pagination.options.dto';

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