import { Component, computed, inject, model } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { PaginationState, SortingState } from '@tanstack/angular-table';
import { skipWhile, take } from 'rxjs';
import { DEFAULT_PAGINATION } from '../../core/consts/pagination.const';
import { QueryActService } from '../../core/queries/query-act.service';
import { Search } from '../../core/types/search.type';
import { TableWrapperComponent } from '../table/wrapper/table-wrapper.component';
import {
  COLUMN_SIZE_STATE_SERVICE_TOKEN,
  COLUMN_VISIBILITY_STATE_SERVICE_TOKEN,
} from '../table/wrapper/table-wrapper.token';
import { ActTableColumnService } from './act-table-column.service';
import { ActTableFiltersComponent } from './filters/act-table-filters.component';

@Component({
  selector: 'app-act-table',
  templateUrl: './act-table.component.html',
  styleUrl: './act-table.component.scss',
  imports: [TableWrapperComponent, ActTableFiltersComponent],
  providers: [
    ActTableColumnService,
    {
      provide: COLUMN_VISIBILITY_STATE_SERVICE_TOKEN,
      useExisting: ActTableColumnService,
    },
    {
      provide: COLUMN_SIZE_STATE_SERVICE_TOKEN,
      useExisting: ActTableColumnService,
    },
  ],
})
export class ActTableComponent {
  readonly #queryActService = inject(QueryActService);
  readonly #columnService = inject(ActTableColumnService);

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

  readonly columns = this.#columnService.tableColumns;
}
