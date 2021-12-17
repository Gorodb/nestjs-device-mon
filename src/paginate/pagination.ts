import { PaginationResultInterface } from './pagination.results.interface';

export class Pagination<PaginationEntity> {
  public items: PaginationEntity[];
  public pagination: {
    total: number;
    totalPages: number;
    limit: number;
    page: number;
    hasNext: boolean;
  };

  constructor(paginationResults: PaginationResultInterface<PaginationEntity>) {
    const totalPages = Math.ceil(
      paginationResults.total / paginationResults.limit,
    );
    this.items = paginationResults.results;
    this.pagination = {
      total: paginationResults.total,
      totalPages,
      limit: paginationResults.limit,
      page: paginationResults.page,
      hasNext: totalPages > paginationResults.page,
    };
  }
}
