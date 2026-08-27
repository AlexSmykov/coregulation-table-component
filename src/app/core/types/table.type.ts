import { ColumnSize, ColumnVisibility } from '../../features/table/wrapper/table-wrapper.type';

export type TableColumnData = ColumnVisibility &
  ColumnSize & {
    name: string;
  };
