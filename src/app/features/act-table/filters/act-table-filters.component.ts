import { Component, computed, inject } from '@angular/core';
import { TableColumnVisibilitySelectionComponent } from '../../table/column-visibility-selection/table-column-visibility-selection.component';
import { ActTableColumnService } from '../services/act-table-column.service';

@Component({
  selector: 'app-act-table-filters',
  templateUrl: './act-table-filters.component.html',
  styleUrl: './act-table-filters.component.scss',
  imports: [TableColumnVisibilitySelectionComponent],
})
export class ActTableFiltersComponent {
  readonly #actTableColumnService = inject(ActTableColumnService);

  readonly columnFormGroup = this.#actTableColumnService.columnFormGroup;

  readonly columnNames = computed(() =>
    this.#actTableColumnService.tableColumns().reduce((acc, value) => {
      return { ...acc, [value.id!]: value.header as string };
    }, {}),
  );
}
