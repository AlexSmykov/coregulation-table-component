import { Component } from '@angular/core';
import { ActTableComponent } from './features/act-table/act-table.component';
import { ACT_TABLE_COLUMNS_TOKEN } from './features/act-table/act-table.token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ActTableComponent],
  providers: [
    {
      provide: ACT_TABLE_COLUMNS_TOKEN,
      useValue: ['title', 'type', 'category', 'author', 'department', 'editedAt'],
    },
  ],
})
export class AppComponent {}
