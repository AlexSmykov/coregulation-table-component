import { computed, inject, Service, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import {
  ColumnDef,
  ColumnSizingState,
  ColumnVisibilityState,
  TableFeatures,
} from '@tanstack/angular-table';
import { Act } from '../../../core/api/act/act-api.type';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import {
  ColumnSizeStateService,
  ColumnVisibility,
  ColumnVisibilityStateService,
} from '../../table/wrapper/table-wrapper.type';
import { ACT_TABLE_COLUMNS } from '../act-table.columns';
import { ACT_TABLE_COLUMNS_TOKEN } from '../act-table.token';
import { ActColumn } from '../act-table.type';

const SAVE_KEY = 'ACT_TABLE_SETTINGS';

@Service({ autoProvided: false })
export class ActTableColumnService implements ColumnVisibilityStateService, ColumnSizeStateService {
  readonly #localStorageService = inject(LocalStorageService);
  readonly #columns = inject(ACT_TABLE_COLUMNS_TOKEN);

  readonly tableColumns = computed<ColumnDef<TableFeatures, Act>[]>(() => {
    const savedValue = this.#localStorageService.getItem(SAVE_KEY);

    const parsedColumns = savedValue
      ? (JSON.parse(savedValue) as ColumnDef<TableFeatures, Act>[])
      : null;

    return ACT_TABLE_COLUMNS.filter((tableColumn) =>
      this.#columns.includes(tableColumn.id as ActColumn),
    ).map(
      (column) => parsedColumns?.find((parsedColumn) => parsedColumn.id === column.id) ?? column,
    );
  });

  readonly visibilityState = signal<ColumnVisibilityState>(
    this.tableColumns().reduce((acc, value) => {
      const meta = value.meta;

      if (!ColumnVisibility.guard(meta)) {
        return acc;
      }

      return { ...acc, [value.id!]: meta.defaultVisibility };
    }, {}),
  );

  readonly sizeState = signal<ColumnSizingState>(
    this.tableColumns().reduce((acc, value) => {
      return { ...acc, [value.id!]: value.size };
    }, {}),
  );

  readonly columnFormGroup = form(this.visibilityState);

  saveSettings(): void {
    this.#localStorageService.setItem(SAVE_KEY, JSON.stringify(this.tableColumns()));
  }
}
