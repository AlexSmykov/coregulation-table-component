import { TableColumnData } from '../../core/types/table.type';
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

export const ACT_COLUMNS_SETTINGS: Record<ActColumn, TableColumnData> = {
  [ACT_COLUMNS.title]: {
    name: 'Название',
    defaultVisibility: true,
    canChangeVisibility: false,
    minSize: 110,
    maxSize: 200,
    currentSize: 110,
  },
  [ACT_COLUMNS.type]: {
    name: 'Тип',
    defaultVisibility: true,
    canChangeVisibility: true,
    minSize: 110,
    maxSize: 200,
    currentSize: 110,
  },
  [ACT_COLUMNS.category]: {
    name: 'Категория',
    defaultVisibility: true,
    canChangeVisibility: true,
    minSize: 110,
    maxSize: 200,
    currentSize: 110,
  },
  [ACT_COLUMNS.author]: {
    name: 'Автор',
    defaultVisibility: false,
    canChangeVisibility: true,
    minSize: 110,
    maxSize: 200,
    currentSize: 110,
  },
  [ACT_COLUMNS.department]: {
    name: 'Департамент',
    defaultVisibility: true,
    canChangeVisibility: true,
    minSize: 125,
    maxSize: 200,
    currentSize: 125,
  },
  [ACT_COLUMNS.createdAt]: {
    name: 'Дата создания',
    defaultVisibility: true,
    canChangeVisibility: true,
    minSize: 150,
    maxSize: 200,
    currentSize: 150,
  },
  [ACT_COLUMNS.editedAt]: {
    name: 'Дата изменения',
    defaultVisibility: true,
    canChangeVisibility: true,
    minSize: 150,
    maxSize: 200,
    currentSize: 150,
  },
};
