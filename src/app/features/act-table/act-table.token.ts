import { InjectionToken } from '@angular/core';
import { ActColumn } from './act-table.type';

export const ACT_TABLE_COLUMNS_TOKEN = new InjectionToken<ActColumn[]>('[ACT_TABLE_COLUMNS_TOKEN]');
