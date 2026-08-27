import { Component, computed, inject, model } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { PaginationState } from '@tanstack/angular-table';
import { DEFAULT_PAGINATION } from '../../core/consts/pagination.const';
import { QueryActService } from '../../core/queries/query-act.service';
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

  readonly #actsQuery = injectQuery(() =>
    this.#queryActService.getActAiNoteVersionOptions(this.pagination()),
  );

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

  readonly isLoading = computed(() => this.#actsQuery.isLoading());

  readonly columns = this.#columnService.tableColumns;
}
