import { Component, input } from '@angular/core';

@Component({
  selector: 'app-table-simple-cell',
  templateUrl: './table-simple-cell.component.html',
  styleUrl: './table-simple-cell.component.scss',
  imports: [],
})
export class TableSimpleCellComponent {
  readonly data = input.required<string | number>();
}
