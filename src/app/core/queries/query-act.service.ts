import { inject, Service } from '@angular/core';
import { queryOptions } from '@tanstack/angular-query-experimental';
import { PaginationState } from '@tanstack/angular-table';
import { firstValueFrom } from 'rxjs';
import { ActApiService } from '../api/act/act-api.service';

const QUERY_KEY = {
  ACT_LIST: 'act-list',
} as const;

@Service()
export class QueryActService {
  readonly #actApiService = inject(ActApiService);

  readonly getActAiNoteVersionOptions = (pagination: PaginationState) =>
    queryOptions({
      queryKey: [QUERY_KEY, pagination],
      queryFn: () => firstValueFrom(this.#actApiService.getList(pagination)),
    });
}
