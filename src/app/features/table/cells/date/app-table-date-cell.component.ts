import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-table-date-cell',
  templateUrl: './app-table-date-cell.component.html',
  styleUrl: './app-table-date-cell.component.scss',
  imports: [DatePipe],
})
export class AppTableDateCellComponent {
  readonly time = input.required<number>();
  readonly format = input<string>('dd.MM.yyyy');
}
