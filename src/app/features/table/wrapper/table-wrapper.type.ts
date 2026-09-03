import { Signal, WritableSignal } from '@angular/core';
import { ColumnSizingState, ColumnVisibilityState } from '@tanstack/angular-table';
import { Boolean, Object } from 'runtypes';

export const ColumnVisibility = Object({
  defaultVisibility: Boolean,
  canChangeVisibility: Boolean,
});

export type ColumnVisibilityStateService = {
  visibilityState: Signal<ColumnVisibilityState>;
};

export type ColumnSizeStateService = {
  sizeState: WritableSignal<ColumnSizingState>;
};
