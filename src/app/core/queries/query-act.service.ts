import { inject, Service } from '@angular/core';
import { queryOptions } from '@tanstack/angular-query-experimental';
import { firstValueFrom } from 'rxjs';
import { ActApiService } from '../api/act/act-api.service';
import { Search } from '../types/search.type';

const QUERY_KEY = {
  ACT_LIST: 'act-list',
} as const;

@Service()
export class QueryActService {
  readonly #actApiService = inject(ActApiService);

  readonly getActAiNoteVersionOptions = (search: Search) =>
    queryOptions({
      queryKey: [QUERY_KEY, search],
      queryFn: () => firstValueFrom(this.#actApiService.getList(search)),
    });
}
