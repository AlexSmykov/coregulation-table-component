import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import {
  ColumnDef,
  columnOrderingFeature,
  columnResizingFeature,
  FlexRenderCell,
  injectTable,
  rowPaginationFeature,
  tableFeatures,
  TableFeatures,
} from '@tanstack/angular-table';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './app-table-wrapper.component.html',
  styleUrl: './app-table-wrapper.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [FlexRenderCell],
})
export class AppTableWrapperComponent<Data extends object> {
  readonly data = input.required<Data[]>();
  readonly columns = input.required<ColumnDef<TableFeatures, Data>[]>();
  readonly withPagination = input(true);
  readonly withColumnResize = input(true);
  readonly withColumnOrder = input(true);

  readonly table = injectTable(() => ({
    features: this.features(),
    columns: this.columns(),
    data: this.data(),
  }));

  readonly features = computed(() => {
    const features = [];

    if (this.withPagination()) {
      features.push(rowPaginationFeature);
    }

    if (this.withColumnResize()) {
      features.push(columnResizingFeature);
    }

    if (this.withColumnOrder()) {
      features.push(columnOrderingFeature);
    }

    return tableFeatures(
      features.reduce<TableFeatures>((acc, item) => {
        return { ...acc, item };
      }, {}),
    );
  });
}
