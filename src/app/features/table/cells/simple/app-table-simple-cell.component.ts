import { Component, input } from '@angular/core';

@Component({
  selector: 'app-table-simple-cell',
  templateUrl: './app-table-simple-cell.component.html',
  styleUrl: './app-table-simple-cell.component.scss',
  imports: [],
})
export class AppTableSimpleCellComponent {
  readonly data = input.required<string | number>();
}
