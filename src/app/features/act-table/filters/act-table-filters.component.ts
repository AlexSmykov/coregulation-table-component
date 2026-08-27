import { Component, inject } from '@angular/core';
import { TableColumnVisibilitySelectionComponent } from '../../table/column-visibility-selection/table-column-visibility-selection.component';
import { ActTableColumnService } from '../act-table-column.service';
import { ACT_COLUMNS_SETTINGS } from '../act-table.columns';

@Component({
  selector: 'app-act-table-filters',
  templateUrl: './act-table-filters.component.html',
  styleUrl: './act-table-filters.component.scss',
  imports: [TableColumnVisibilitySelectionComponent],
})
export class ActTableFiltersComponent {
  readonly #actTableColumnVisibilityService = inject(ActTableColumnService);

  readonly columnFormGroup = this.#actTableColumnVisibilityService.columnFormGroup;

  readonly columnNames = Object.fromEntries(
    Object.entries(ACT_COLUMNS_SETTINGS).map(([key, value]) => [key, value.name]),
  );
}
