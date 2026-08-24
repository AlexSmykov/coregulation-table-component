import { ACT_COLUMNS } from './act-table.columns';

export type ActColumn = (typeof ACT_COLUMNS)[keyof typeof ACT_COLUMNS];
