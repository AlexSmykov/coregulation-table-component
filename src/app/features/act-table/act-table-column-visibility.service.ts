import { Service, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { ColumnVisibilityState } from '@tanstack/angular-table';
import { ColumnVisibilityStateService } from '../table/wrapper/table-wrapper.type';
import { ACT_COLUMNS_VISIBILITY_SETTINGS } from './act-table.columns';

@Service({ autoProvided: false })
export class ActTableColumnVisibilityService implements ColumnVisibilityStateService {
  readonly visibilityState = signal<ColumnVisibilityState>(
    Object.entries(ACT_COLUMNS_VISIBILITY_SETTINGS)
      .filter(([_, value]) => value.canChangeVisibility)
      .reduce((acc, [key, value]) => {
        return { ...acc, [key]: value.defaultVisibility };
      }, {}),
  );

  readonly columnFormGroup = form(this.visibilityState);
}
