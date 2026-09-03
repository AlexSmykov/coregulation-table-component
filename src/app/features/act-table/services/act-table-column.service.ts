import { computed, inject, Service, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import {
  ColumnDef,
  ColumnSizingState,
  ColumnVisibilityState,
  TableFeatures,
} from '@tanstack/angular-table';
import { Act } from '../../../core/api/act/act-api.type';
import {
  ColumnSizeStateService,
  ColumnVisibility,
  ColumnVisibilityStateService,
} from '../../table/wrapper/table-wrapper.type';
import { ACT_TABLE_COLUMNS } from '../act-table.columns';
import { ACT_TABLE_COLUMNS_TOKEN } from '../act-table.token';
import { ActColumn } from '../act-table.type';

@Service({ autoProvided: false })
export class ActTableColumnService implements ColumnVisibilityStateService, ColumnSizeStateService {
  readonly #columns = inject(ACT_TABLE_COLUMNS_TOKEN);

  readonly tableColumns = computed<ColumnDef<TableFeatures, Act>[]>(() =>
    ACT_TABLE_COLUMNS.filter((tableColumn) => this.#columns.includes(tableColumn.id as ActColumn)),
  );

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
}
