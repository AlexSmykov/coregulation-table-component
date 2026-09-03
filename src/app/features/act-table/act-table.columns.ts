import { createColumnHelper, flexRenderComponent, TableFeatures } from '@tanstack/angular-table';
import { Act } from '../../core/api/act/act-api.type';
import { TableDateCellComponent } from '../table/cells/date/table-date-cell.component';
import { TableDepartmentCellComponent } from '../table/cells/department/table-department-cell.component';
import { TableSimpleCellComponent } from '../table/cells/simple/table-simple-cell.component';

export const ACT_COLUMNS = {
  title: 'title',
  type: 'type',
  category: 'category',
  author: 'author',
  department: 'department',
  createdAt: 'createdAt',
  editedAt: 'editedAt',
} as const;

const columnHelper = createColumnHelper<TableFeatures, Act>();

export const ACT_TABLE_COLUMNS = columnHelper.columns([
  columnHelper.accessor('title', {
    id: 'title',
    header: 'Название',
    minSize: 125,
    maxSize: 400,
    cell: (info) =>
      flexRenderComponent(TableSimpleCellComponent, {
        inputs: { data: info.getValue() },
      }),
    meta: {
      defaultVisibility: true,
      canChangeVisibility: false,
    },
  }),
  columnHelper.accessor('type', {
    id: 'type',
    header: 'Тип',
    minSize: 110,
    maxSize: 250,
    cell: (info) =>
      flexRenderComponent(TableSimpleCellComponent, {
        inputs: { data: info.getValue() },
      }),
    meta: {
      defaultVisibility: true,
      canChangeVisibility: true,
    },
  }),
  columnHelper.accessor('category', {
    id: 'category',
    header: 'Категория',
    minSize: 110,
    maxSize: 200,
    cell: (info) =>
      flexRenderComponent(TableSimpleCellComponent, {
        inputs: { data: info.getValue() },
      }),
    meta: {
      defaultVisibility: true,
      canChangeVisibility: true,
    },
  }),
  columnHelper.accessor('author', {
    id: 'author',
    header: 'Автор',
    minSize: 110,
    maxSize: 250,
    cell: (info) =>
      flexRenderComponent(TableSimpleCellComponent, {
        inputs: { data: info.getValue() },
      }),
    meta: {
      defaultVisibility: true,
      canChangeVisibility: true,
    },
  }),
  columnHelper.accessor('department', {
    id: 'department',
    header: 'Департамент',
    minSize: 125,
    maxSize: 200,
    cell: (info) =>
      flexRenderComponent(TableDepartmentCellComponent, {
        inputs: { department: info.getValue() },
      }),
    meta: {
      defaultVisibility: false,
      canChangeVisibility: true,
    },
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    header: 'Дата создания',
    minSize: 150,
    maxSize: 150,
    cell: (info) =>
      flexRenderComponent(TableDateCellComponent, { inputs: { time: info.getValue() } }),
    meta: {
      defaultVisibility: true,
      canChangeVisibility: true,
    },
  }),
  columnHelper.accessor('editedAt', {
    id: 'editedAt',
    header: 'Дата изменения',
    minSize: 150,
    maxSize: 150,
    cell: (info) =>
      flexRenderComponent(TableDateCellComponent, { inputs: { time: info.getValue() } }),
    meta: {
      defaultVisibility: true,
      canChangeVisibility: true,
    },
  }),
]);
