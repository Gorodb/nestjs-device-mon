import { FilterOperator, PaginateConfig } from 'nestjs-paginate';
import { Departments } from './departments.entity';

export const DepartmentsPaginationConfig: PaginateConfig<Departments> = {
  sortableColumns: ['id'],
  searchableColumns: ['name', 'description'],
  defaultSortBy: [['id', 'DESC']],
  filterableColumns: {
    name: [FilterOperator.GTE, FilterOperator.LTE],
  },
};
