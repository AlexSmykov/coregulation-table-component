import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-table-date-cell',
  templateUrl: './table-date-cell.component.html',
  styleUrl: './table-date-cell.component.scss',
  imports: [DatePipe],
})
export class TableDateCellComponent {
  readonly time = input.required<number>();
  readonly format = input<string>('dd.MM.yyyy');
}
