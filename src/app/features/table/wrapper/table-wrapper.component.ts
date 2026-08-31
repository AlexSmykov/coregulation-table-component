import {
  Component,
  computed,
  inject,
  input,
  model,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import {
  ColumnDef,
  columnOrderingFeature,
  columnResizingFeature,
  columnSizingFeature,
  ColumnSizingState,
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
import { AppTableWrapperSortIndicatorPipe } from './table-wrapper-sort-indicator.pipe';
import {
  COLUMN_SIZE_STATE_SERVICE_TOKEN,
  COLUMN_VISIBILITY_STATE_SERVICE_TOKEN,
} from './table-wrapper.token';

const MIN_COLUMN_SIZE = 100;
const MAX_COLUMN_SIZE = 500;

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrl: './table-wrapper.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [FlexRenderCell, AppTableWrapperSortIndicatorPipe],
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
  readonly isFirstLoading = input(false);
  readonly isLoading = input(false);

  readonly pagination = model<PaginationState>(DEFAULT_PAGINATION);
  readonly sorting = model<SortingState>([]);

  readonly #columnVisibilityStateService = inject(COLUMN_VISIBILITY_STATE_SERVICE_TOKEN);
  readonly #columnSizeStateService = inject(COLUMN_SIZE_STATE_SERVICE_TOKEN);

  readonly columnVisibilityState = this.#columnVisibilityStateService.visibilityState;

  readonly table = injectTable(() => ({
    features: this.features(),
    columns: this.columns(),
    data: this.data(),
    state: {
      pagination: this.pagination(),
      sorting: this.sorting(),
      columnVisibility: this.columnVisibilityState(),
      columnSizing: this.#columnSizeStateService.sizeState(),
    },
    columnResizeMode: 'onChange' as const,
    columnResizeDirection: 'ltr',
    defaultColumn: {
      minSize: MIN_COLUMN_SIZE,
      maxSize: MAX_COLUMN_SIZE,
    },
    manualPagination: true,
    onPaginationChange: (updater: Updater<PaginationState>) =>
      isFunction(updater) ? this.pagination.update(updater) : this.pagination.set(updater),
    onSortingChange: (updater: Updater<SortingState>) =>
      isFunction(updater) ? this.sorting.update(updater) : this.sorting.set(updater),
    onColumnSizingChange: (updater: Updater<ColumnSizingState>) =>
      isFunction(updater)
        ? this.#columnSizeStateService.sizeState.update(updater)
        : this.#columnSizeStateService.sizeState.set(updater),
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

  readonly tableStyle = computed(() => {
    void this.table.atoms.columnSizing.get();

    return untracked(() => {
      const styles: Record<string, string> = { display: 'grid' };

      for (const header of this.table.getFlatHeaders()) {
        styles[`--header-${header.id}-size`] = `${header.getSize()}`;
        styles[`--col-${header.column.id}-size`] = `${header.column.getSize()}`;
      }

      styles['width'] = `${this.table.getTotalSize()}px`;

      return styles;
    });
  });

  setPage(page: number) {
    this.pagination.update((oldValue) => {
      return { ...oldValue, pageIndex: page };
    });
  }

  protected readonly event = event;
}
