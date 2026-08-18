import { Component } from '@angular/core';
import { AppDemoComponent } from './features/demo/app-demo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [AppDemoComponent],
})
export class AppComponent {}
