import { Signal } from '@angular/core';
import { ColumnVisibilityState } from '@tanstack/angular-table';

export type ColumnVisibility = {
  defaultVisibility: boolean;
  canChangeVisibility: boolean;
};

export type ColumnVisibilityStateService = {
  visibilityState: Signal<ColumnVisibilityState>;
};

export type ColumnsVisibilityForm<Keys extends string = string> = {
  [key in Keys]: boolean;
};
