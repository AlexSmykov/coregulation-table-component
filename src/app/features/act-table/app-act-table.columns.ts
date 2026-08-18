import {
  ColumnDef,
  createColumnHelper,
  flexRenderComponent,
  TableFeatures,
} from '@tanstack/angular-table';
import { Act } from '../../core/api/act/act-api.type';
import { AppTableDateCellComponent } from '../table/cells/date/app-table-date-cell.component';
import { AppTableDepartmentCellComponent } from '../table/cells/department/app-table-department-cell.component';
import { AppTableSimpleCellComponent } from '../table/cells/simple/app-table-simple-cell.component';

const columnHelper = createColumnHelper<TableFeatures, Act>();

export const ACT_COLUMNS: ColumnDef<TableFeatures, Act>[] = columnHelper.columns([
  columnHelper.accessor('title', {
    id: 'title',
    header: 'Название',
    cell: (info) =>
      flexRenderComponent(AppTableSimpleCellComponent, {
        inputs: { data: info.getValue() },
      }),
  }),
  columnHelper.accessor('type', {
    id: 'type',
    header: 'Тип',
    cell: (info) =>
      flexRenderComponent(AppTableSimpleCellComponent, {
        inputs: { data: info.getValue() },
      }),
  }),
  columnHelper.accessor('category', {
    id: 'category',
    header: 'Категория',
    cell: (info) =>
      flexRenderComponent(AppTableSimpleCellComponent, {
        inputs: { data: info.getValue() },
      }),
  }),
  columnHelper.accessor('author', {
    id: 'author',
    header: 'Автор',
    cell: (info) =>
      flexRenderComponent(AppTableSimpleCellComponent, {
        inputs: { data: info.getValue() },
      }),
  }),
  columnHelper.accessor('department', {
    id: 'department',
    header: 'Департамент',
    cell: (info) =>
      flexRenderComponent(AppTableDepartmentCellComponent, {
        inputs: { department: info.getValue() },
      }),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    header: 'Дата создания',
    cell: (info) =>
      flexRenderComponent(AppTableDateCellComponent, { inputs: { time: info.getValue() } }),
  }),
  columnHelper.accessor('editedAt', {
    id: 'editedAt',
    header: 'Дата изменения',
    cell: (info) =>
      flexRenderComponent(AppTableDateCellComponent, { inputs: { time: info.getValue() } }),
  }),
]);
