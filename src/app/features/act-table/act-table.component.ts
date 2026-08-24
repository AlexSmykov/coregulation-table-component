import { Component, computed, inject, model } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { PaginationState } from '@tanstack/angular-table';
import { DEFAULT_PAGINATION } from '../../core/consts/pagination.const';
import { QueryActService } from '../../core/queries/query-act.service';
import { TableWrapperComponent } from '../table/wrapper/table-wrapper.component';
import { COLUMN_VISIBILITY_STATE_SERVICE_TOKEN } from '../table/wrapper/table-wrapper.token';
import { ActTableColumnVisibilityService } from './act-table-column-visibility.service';
import { ACT_COLUMNS_DATA } from './act-table.columns';
import { ActTableFiltersComponent } from './filters/act-table-filters.component';

@Component({
  selector: 'app-act-table',
  templateUrl: './act-table.component.html',
  styleUrl: './act-table.component.scss',
  imports: [TableWrapperComponent, ActTableFiltersComponent],
  providers: [
    ActTableColumnVisibilityService,
    {
      provide: COLUMN_VISIBILITY_STATE_SERVICE_TOKEN,
      useExisting: ActTableColumnVisibilityService,
    },
  ],
})
export class ActTableComponent {
  readonly #queryActService = inject(QueryActService);

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

  readonly columns = ACT_COLUMNS_DATA;
}
