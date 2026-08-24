import {
  ColumnDef,
  createColumnHelper,
  flexRenderComponent,
  TableFeatures,
} from '@tanstack/angular-table';
import { Act } from '../../core/api/act/act-api.type';
import { TableDateCellComponent } from '../table/cells/date/table-date-cell.component';
import { TableDepartmentCellComponent } from '../table/cells/department/table-department-cell.component';
import { TableSimpleCellComponent } from '../table/cells/simple/table-simple-cell.component';
import { ColumnVisibility } from '../table/wrapper/table-wrapper.type';
import { ActColumn } from './act-table.type';

export const ACT_COLUMNS = {
  title: 'title',
  type: 'type',
  category: 'category',
  author: 'author',
  department: 'department',
  createdAt: 'createdAt',
  editedAt: 'editedAt',
} as const;

export const ACT_COLUMNS_VISIBILITY_SETTINGS: Record<ActColumn, ColumnVisibility> = {
  [ACT_COLUMNS.title]: {
    defaultVisibility: true,
    canChangeVisibility: false,
  },
  [ACT_COLUMNS.type]: {
    defaultVisibility: true,
    canChangeVisibility: true,
  },
  [ACT_COLUMNS.category]: {
    defaultVisibility: true,
    canChangeVisibility: true,
  },
  [ACT_COLUMNS.author]: {
    defaultVisibility: false,
    canChangeVisibility: true,
  },
  [ACT_COLUMNS.department]: {
    defaultVisibility: true,
    canChangeVisibility: true,
  },
  [ACT_COLUMNS.createdAt]: {
    defaultVisibility: true,
    canChangeVisibility: true,
  },
  [ACT_COLUMNS.editedAt]: {
    defaultVisibility: true,
    canChangeVisibility: true,
  },
};

export const ACT_COLUMNS_NAMES: Record<ActColumn, string> = {
  [ACT_COLUMNS.title]: 'Название',
  [ACT_COLUMNS.type]: 'Тип',
  [ACT_COLUMNS.category]: 'Категория',
  [ACT_COLUMNS.author]: 'Автор',
  [ACT_COLUMNS.department]: 'Департамент',
  [ACT_COLUMNS.createdAt]: 'Дата создания',
  [ACT_COLUMNS.editedAt]: 'Дата изменения',
};

const columnHelper = createColumnHelper<TableFeatures, Act>();

export const ACT_COLUMNS_DATA: ColumnDef<TableFeatures, Act>[] = columnHelper.columns([
  columnHelper.accessor('title', {
    id: ACT_COLUMNS.title,
    header: ACT_COLUMNS_NAMES.title,
    cell: (info) =>
      flexRenderComponent(TableSimpleCellComponent, {
        inputs: { data: info.getValue() },
      }),
  }),
  columnHelper.accessor('type', {
    id: ACT_COLUMNS.type,
    header: ACT_COLUMNS_NAMES.type,
    cell: (info) =>
      flexRenderComponent(TableSimpleCellComponent, {
        inputs: { data: info.getValue() },
      }),
  }),
  columnHelper.accessor('category', {
    id: ACT_COLUMNS.category,
    header: ACT_COLUMNS_NAMES.category,
    cell: (info) =>
      flexRenderComponent(TableSimpleCellComponent, {
        inputs: { data: info.getValue() },
      }),
  }),
  columnHelper.accessor('author', {
    id: ACT_COLUMNS.author,
    header: ACT_COLUMNS_NAMES.author,
    cell: (info) =>
      flexRenderComponent(TableSimpleCellComponent, {
        inputs: { data: info.getValue() },
      }),
  }),
  columnHelper.accessor('department', {
    id: ACT_COLUMNS.department,
    header: ACT_COLUMNS_NAMES.department,
    cell: (info) =>
      flexRenderComponent(TableDepartmentCellComponent, {
        inputs: { department: info.getValue() },
      }),
  }),
  columnHelper.accessor('createdAt', {
    id: ACT_COLUMNS.createdAt,
    header: ACT_COLUMNS_NAMES.createdAt,
    cell: (info) =>
      flexRenderComponent(TableDateCellComponent, { inputs: { time: info.getValue() } }),
  }),
  columnHelper.accessor('editedAt', {
    id: ACT_COLUMNS.editedAt,
    header: ACT_COLUMNS_NAMES.editedAt,
    cell: (info) =>
      flexRenderComponent(TableDateCellComponent, { inputs: { time: info.getValue() } }),
  }),
]);
