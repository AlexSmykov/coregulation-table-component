import { computed, inject, model, Service } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { PaginationState, SortingState } from '@tanstack/angular-table';
import { skipWhile, take } from 'rxjs';
import { DEFAULT_PAGINATION } from '../../core/consts/pagination.const';
import { QueryActService } from '../../core/queries/query-act.service';
import { Search } from '../../core/types/search.type';

@Service({ autoProvided: false })
export class ActTableService {
  readonly #queryActService = inject(QueryActService);

  readonly pagination = model<PaginationState>(DEFAULT_PAGINATION);
  readonly sort = model<SortingState>([]);

  readonly #actsQuery = injectQuery(() =>
    this.#queryActService.getActAiNoteVersionOptions(this.#searchFilters()),
  );

  readonly #searchFilters = computed<Search>(() => {
    const pagination = this.pagination();
    const sort = this.sort();

    return {
      pagination,
      sort,
      filters: {},
    };
  });

  readonly acts = computed(() => {
    const page = this.#actsQuery.data();

    if (!page) {
      return [];
    }

    return page.items;
  });

  readonly itemCount = computed(() => {
    const page = this.#actsQuery.data();

    if (!page) {
      return 0;
    }

    return page.allItemsCount;
  });

  readonly isLoading$ = toObservable(this.#actsQuery.isLoading);

  readonly isFirstLoading = toSignal(
    this.isLoading$.pipe(
      skipWhile((value) => !value),
      take(2),
    ),
    { initialValue: false },
  );

  readonly isLoading = computed(() => this.#actsQuery.isLoading());
}
