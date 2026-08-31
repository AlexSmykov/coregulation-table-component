import { Component, inject, model } from '@angular/core';
import { PaginationState, SortingState } from '@tanstack/angular-table';
import { DEFAULT_PAGINATION } from '../../core/consts/pagination.const';
import { TableWrapperComponent } from '../table/wrapper/table-wrapper.component';
import {
  COLUMN_SIZE_STATE_SERVICE_TOKEN,
  COLUMN_VISIBILITY_STATE_SERVICE_TOKEN,
} from '../table/wrapper/table-wrapper.token';
import { ActTableColumnService } from './act-table-column.service';
import { ActTableService } from './act-table.service';
import { ActTableFiltersComponent } from './filters/act-table-filters.component';

@Component({
  selector: 'app-act-table',
  templateUrl: './act-table.component.html',
  styleUrl: './act-table.component.scss',
  imports: [TableWrapperComponent, ActTableFiltersComponent],
  providers: [
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

  readonly pagination = model<PaginationState>(DEFAULT_PAGINATION);
  readonly sort = model<SortingState>([]);

  readonly acts = this.#actTableService.acts;
  readonly itemCount = this.#actTableService.itemCount;
  readonly isFirstLoading = this.#actTableService.isFirstLoading;
  readonly isLoading = this.#actTableService.isLoading;
  readonly columns = this.#columnService.tableColumns;
}
