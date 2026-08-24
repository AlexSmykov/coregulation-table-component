import { Component, inject } from '@angular/core';
import { TableColumnVisibilitySelectionComponent } from '../../table/column-visibility-selection/table-column-visibility-selection.component';
import { ActTableColumnVisibilityService } from '../act-table-column-visibility.service';
import { ACT_COLUMNS_NAMES } from '../act-table.columns';

@Component({
  selector: 'app-act-table-filters',
  templateUrl: './act-table-filters.component.html',
  styleUrl: './act-table-filters.component.scss',
  imports: [TableColumnVisibilitySelectionComponent],
})
export class ActTableFiltersComponent {
  readonly #actTableColumnVisibilityService = inject(ActTableColumnVisibilityService);

  readonly columnFormGroup = this.#actTableColumnVisibilityService.columnFormGroup;

  readonly columnNames = ACT_COLUMNS_NAMES;
}
