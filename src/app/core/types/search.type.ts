import { PaginationState, SortingState } from '@tanstack/angular-table';

export type SearchFilters = Record<string, object>;

export type Search = {
  pagination: PaginationState;
  sort: SortingState;
  filters: SearchFilters;
};
