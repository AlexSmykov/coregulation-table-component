import { computed, Service, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import {
  ColumnDef,
  ColumnSizingState,
  ColumnVisibilityState,
  createColumnHelper,
  flexRenderComponent,
  TableFeatures,
} from '@tanstack/angular-table';
import { Act } from '../../core/api/act/act-api.type';
import { TableDateCellComponent } from '../table/cells/date/table-date-cell.component';
import { TableDepartmentCellComponent } from '../table/cells/department/table-department-cell.component';
import { TableSimpleCellComponent } from '../table/cells/simple/table-simple-cell.component';
import {
  ColumnSizeStateService,
  ColumnVisibilityStateService,
} from '../table/wrapper/table-wrapper.type';
import { ACT_COLUMNS, ACT_COLUMNS_SETTINGS } from './act-table.columns';

@Service({ autoProvided: false })
export class ActTableColumnService implements ColumnVisibilityStateService, ColumnSizeStateService {
  readonly visibilityState = signal<ColumnVisibilityState>(
    Object.entries(ACT_COLUMNS_SETTINGS)
      .filter(([_, value]) => value.canChangeVisibility)
      .reduce((acc, [key, value]) => {
        return { ...acc, [key]: value.defaultVisibility };
      }, {}),
  );

  readonly sizeState = signal<ColumnSizingState>(
    Object.entries(ACT_COLUMNS_SETTINGS).reduce((acc, [key, value]) => {
      return { ...acc, [key]: value.currentSize };
    }, {}),
  );
  readonly tableColumns = computed<ColumnDef<TableFeatures, Act>[]>(() => {
    const columnHelper = createColumnHelper<TableFeatures, Act>();

    return columnHelper.columns([
      columnHelper.accessor('title', {
        id: ACT_COLUMNS.title,
        header: ACT_COLUMNS_SETTINGS.title.name,
        minSize: ACT_COLUMNS_SETTINGS.title.minSize,
        maxSize: ACT_COLUMNS_SETTINGS.title.maxSize,
        cell: (info) =>
          flexRenderComponent(TableSimpleCellComponent, {
            inputs: { data: info.getValue() },
          }),
      }),
      columnHelper.accessor('type', {
        id: ACT_COLUMNS.type,
        header: ACT_COLUMNS_SETTINGS.type.name,
        minSize: ACT_COLUMNS_SETTINGS.type.minSize,
        maxSize: ACT_COLUMNS_SETTINGS.type.maxSize,
        cell: (info) =>
          flexRenderComponent(TableSimpleCellComponent, {
            inputs: { data: info.getValue() },
          }),
      }),
      columnHelper.accessor('category', {
        id: ACT_COLUMNS.category,
        header: ACT_COLUMNS_SETTINGS.category.name,
        minSize: ACT_COLUMNS_SETTINGS.category.minSize,
        maxSize: ACT_COLUMNS_SETTINGS.category.maxSize,
        cell: (info) =>
          flexRenderComponent(TableSimpleCellComponent, {
            inputs: { data: info.getValue() },
          }),
      }),
      columnHelper.accessor('author', {
        id: ACT_COLUMNS.author,
        header: ACT_COLUMNS_SETTINGS.author.name,
        minSize: ACT_COLUMNS_SETTINGS.author.minSize,
        maxSize: ACT_COLUMNS_SETTINGS.author.maxSize,
        cell: (info) =>
          flexRenderComponent(TableSimpleCellComponent, {
            inputs: { data: info.getValue() },
          }),
      }),
      columnHelper.accessor('department', {
        id: ACT_COLUMNS.department,
        header: ACT_COLUMNS_SETTINGS.department.name,
        minSize: ACT_COLUMNS_SETTINGS.department.minSize,
        maxSize: ACT_COLUMNS_SETTINGS.department.maxSize,
        cell: (info) =>
          flexRenderComponent(TableDepartmentCellComponent, {
            inputs: { department: info.getValue() },
          }),
      }),
      columnHelper.accessor('createdAt', {
        id: ACT_COLUMNS.createdAt,
        header: ACT_COLUMNS_SETTINGS.createdAt.name,
        minSize: ACT_COLUMNS_SETTINGS.createdAt.minSize,
        maxSize: ACT_COLUMNS_SETTINGS.createdAt.maxSize,
        cell: (info) =>
          flexRenderComponent(TableDateCellComponent, { inputs: { time: info.getValue() } }),
      }),
      columnHelper.accessor('editedAt', {
        id: ACT_COLUMNS.editedAt,
        header: ACT_COLUMNS_SETTINGS.editedAt.name,
        minSize: ACT_COLUMNS_SETTINGS.editedAt.minSize,
        maxSize: ACT_COLUMNS_SETTINGS.editedAt.maxSize,
        cell: (info) =>
          flexRenderComponent(TableDateCellComponent, { inputs: { time: info.getValue() } }),
      }),
    ]);
  });

  readonly columnFormGroup = form(this.visibilityState);
}
