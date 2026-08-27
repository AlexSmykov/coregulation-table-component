import { Signal, WritableSignal } from '@angular/core';
import { ColumnSizingState, ColumnVisibilityState } from '@tanstack/angular-table';

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

export type ColumnSize = {
  minSize?: number;
  maxSize?: number;
  currentSize: number;
};

export type ColumnSizeStateService = {
  sizeState: WritableSignal<ColumnSizingState>;
};
