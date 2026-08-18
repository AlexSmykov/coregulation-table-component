import { Component } from '@angular/core';
import { AppActTableComponent } from '../act-table/app-act-table.component';

@Component({
  selector: 'app-demo',
  templateUrl: './app-demo.component.html',
  styleUrl: './app-demo.component.scss',
  imports: [AppActTableComponent],
})
export class AppDemoComponent {}
