import { FilterOperator, PaginateConfig } from 'nestjs-paginate';
import { Users } from './entities/users.entity';

export const UsersPaginationConfig: PaginateConfig<Users> = {
  sortableColumns: ['id', 'name', 'phone', 'role', 'email'],
  searchableColumns: ['name', 'phone', 'email', 'description'],
  defaultSortBy: [['id', 'DESC']],
  filterableColumns: {
    name: [FilterOperator.GTE, FilterOperator.LTE],
  },
}
