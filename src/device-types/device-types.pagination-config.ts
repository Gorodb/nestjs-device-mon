import { FilterOperator, PaginateConfig } from 'nestjs-paginate';
import { DeviceTypes } from './device-types.entity';

export const DeviceTypesPaginationConfig: PaginateConfig<DeviceTypes> = {
  sortableColumns: ['id', 'title'],
  searchableColumns: ['deviceType', 'title', 'description'],
  defaultSortBy: [['id', 'DESC']],
  filterableColumns: {
    title: [FilterOperator.GTE, FilterOperator.LTE],
  },
};
