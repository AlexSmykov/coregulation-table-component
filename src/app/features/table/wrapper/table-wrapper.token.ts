import { InjectionToken } from '@angular/core';
import { ColumnSizeStateService, ColumnVisibilityStateService } from './table-wrapper.type';

export const COLUMN_VISIBILITY_STATE_SERVICE_TOKEN =
  new InjectionToken<ColumnVisibilityStateService>('[COLUMN_VISIBILITY_STATE_SERVICE_TOKEN]');

export const COLUMN_SIZE_STATE_SERVICE_TOKEN = new InjectionToken<ColumnSizeStateService>(
  '[COLUMN_SIZE_STATE_SERVICE_TOKEN]',
);
