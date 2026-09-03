import { Component, inject } from '@angular/core';
import { TableWrapperComponent } from '../table/wrapper/table-wrapper.component';
import {
  COLUMN_SIZE_STATE_SERVICE_TOKEN,
  COLUMN_VISIBILITY_STATE_SERVICE_TOKEN,
} from '../table/wrapper/table-wrapper.token';
import { ActTableFiltersComponent } from './filters/act-table-filters.component';
import { ActTableColumnService } from './services/act-table-column.service';
import { ActTableService } from './services/act-table.service';

@Component({
  selector: 'app-act-table',
  templateUrl: './act-table.component.html',
  styleUrl: './act-table.component.scss',
  imports: [TableWrapperComponent, ActTableFiltersComponent],
  providers: [
    ActTableService,
    ActTableColumnService,
    {
      provide: COLUMN_VISIBILITY_STATE_SERVICE_TOKEN,
      useExisting: ActTableColumnService,
    },
    {
      provide: COLUMN_SIZE_STATE_SERVICE_TOKEN,
      useExisting: ActTableColumnService,
    },
  ],
})
export class ActTableComponent {
  readonly #actTableService = inject(ActTableService);
  readonly #columnService = inject(ActTableColumnService);

  readonly pagination = this.#actTableService.pagination;
  readonly sort = this.#actTableService.sort;

  readonly acts = this.#actTableService.acts;
  readonly itemCount = this.#actTableService.itemCount;
  readonly isFirstLoading = this.#actTableService.isFirstLoading;
  readonly isLoading = this.#actTableService.isLoading;
  readonly columns = this.#columnService.tableColumns;
}
