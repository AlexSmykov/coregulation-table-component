import { Component, computed, inject, input, model, ViewEncapsulation } from '@angular/core';
import {
  ColumnDef,
  columnOrderingFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  FlexRenderCell,
  injectTable,
  isFunction,
  PaginationState,
  rowPaginationFeature,
  rowSortingFeature,
  SortingState,
  tableFeatures,
  TableFeatures,
  Updater,
} from '@tanstack/angular-table';
import { DEFAULT_PAGINATION } from '../../../core/consts/pagination.const';
import { COLUMN_VISIBILITY_STATE_SERVICE_TOKEN } from './table-wrapper.token';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrl: './table-wrapper.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [FlexRenderCell],
})
export class TableWrapperComponent<Data extends object> {
  readonly data = input.required<Data[]>();
  readonly columns = input.required<ColumnDef<TableFeatures, Data>[]>();
  readonly withPagination = input(true);
  readonly withVisibilityChange = input(true);
  readonly withSorting = input(true);
  readonly withColumnResize = input(true);
  readonly withColumnOrder = input(true);
  readonly itemCount = input(0);
  readonly isLoading = input(false);

  readonly #columnVisibilityStateService = inject(COLUMN_VISIBILITY_STATE_SERVICE_TOKEN);

  readonly pagination = model<PaginationState>(DEFAULT_PAGINATION);
  readonly sorting = model<SortingState>([]);
  readonly columnVisibilityState = this.#columnVisibilityStateService.visibilityState;

  readonly table = injectTable(() => ({
    features: this.features(),
    columns: this.columns(),
    data: this.data(),
    state: {
      pagination: this.pagination(),
      sorting: this.sorting(),
      columnVisibility: this.columnVisibilityState(),
    },
    columnResizeMode: 'onChange' as const,
    defaultColumn: {
      minSize: 60,
      maxSize: 800,
    },
    manualPagination: true,
    onPaginationChange: (updater: Updater<PaginationState>) =>
      isFunction(updater) ? this.pagination.update(updater) : this.pagination.set(updater),
    onSortingChange: (updater: Updater<SortingState>) =>
      isFunction(updater) ? this.sorting.update(updater) : this.sorting.set(updater),
  }));

  readonly features = computed(() =>
    tableFeatures({
      ...(this.withPagination() && { rowPaginationFeature }),
      ...(this.withVisibilityChange() && { columnVisibilityFeature }),
      ...(this.withSorting() && { rowSortingFeature }),
      ...(this.withColumnResize() && { columnSizingFeature, columnResizingFeature }),
      ...(this.withColumnOrder() && { columnOrderingFeature }),
    }),
  );

  readonly paginationPages = computed(() => {
    const pageCount = Math.ceil(this.itemCount() / this.pagination().pageSize);
    const pageButtons: number[] = [];

    if (pageCount < 1) {
      pageButtons.push(0);

      return pageButtons;
    }

    for (let i = 1; i <= pageCount; i++) {
      if (i === 1 || Math.abs(i - this.pagination().pageIndex) <= 2 || i === pageCount) {
        pageButtons.push(i);
      }
    }

    return pageButtons;
  });

  setPage(page: number) {
    this.pagination.update((oldValue) => {
      return { ...oldValue, pageIndex: page };
    });
  }
}
