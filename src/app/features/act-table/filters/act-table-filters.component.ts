import { Component, computed, inject, OnDestroy } from '@angular/core';
import { TableColumnVisibilitySelectionComponent } from '../../table/column-visibility-selection/table-column-visibility-selection.component';
import { ActTableColumnService } from '../services/act-table-column.service';

@Component({
  selector: 'app-act-table-filters',
  templateUrl: './act-table-filters.component.html',
  styleUrl: './act-table-filters.component.scss',
  imports: [TableColumnVisibilitySelectionComponent],
  host: {
    '(window:beforeunload)': 'ngOnDestroy()',
  },
})
export class ActTableFiltersComponent implements OnDestroy {
  readonly #actTableColumnService = inject(ActTableColumnService);

  readonly columnFormGroup = this.#actTableColumnService.columnFormGroup;

  readonly columnNames = computed(() =>
    this.#actTableColumnService.tableColumns().reduce((acc, value) => {
      return { ...acc, [value.id!]: value.header as string };
    }, {}),
  );

  ngOnDestroy(): void {
    this.#actTableColumnService.saveSettings();
  }
}
