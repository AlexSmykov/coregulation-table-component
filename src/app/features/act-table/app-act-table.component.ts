import { Component, computed, inject, model } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { PaginationState } from '@tanstack/angular-table';
import { DEFAULT_PAGINATION } from '../../core/consts/pagination.const';
import { QueryActService } from '../../core/queries/query-act.service';
import { AppTableWrapperComponent } from '../table/wrapper/app-table-wrapper.component';
import { ACT_COLUMNS } from './app-act-table.columns';

@Component({
  selector: 'app-act-table',
  templateUrl: './app-act-table.component.html',
  styleUrl: './app-act-table.component.scss',
  imports: [AppTableWrapperComponent],
})
export class AppActTableComponent {
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

  readonly columns = ACT_COLUMNS;
}
