import { InjectionToken } from '@angular/core';
import { ColumnVisibilityStateService } from './table-wrapper.type';

export const COLUMN_VISIBILITY_STATE_SERVICE_TOKEN =
  new InjectionToken<ColumnVisibilityStateService>('[COLUMN_VISIBILITY_STATE_SERVICE_TOKEN]');
