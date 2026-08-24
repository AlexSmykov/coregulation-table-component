import { Component, computed, input, signal } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { ColumnVisibilityState } from '@tanstack/angular-table';

@Component({
  selector: 'app-table-column-visibility-selection',
  templateUrl: './table-column-visibility-selection.component.html',
  styleUrl: './table-column-visibility-selection.component.scss',
  imports: [FormField],
})
export class TableColumnVisibilitySelectionComponent {
  readonly columnFormGroup = input.required<FieldTree<ColumnVisibilityState>>();
  readonly columnNames = input.required<Record<string, string>>();

  readonly isSelectionOpen = signal(false);

  readonly columnList = computed(() => Object.entries(this.columnFormGroup()));
}
