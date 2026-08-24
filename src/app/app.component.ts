import { Component } from '@angular/core';
import { ActTableComponent } from './features/act-table/act-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ActTableComponent],
})
export class AppComponent {}
