import { Component } from '@angular/core';
import { PageHeader } from './headings/page-header/page-header';

@Component({
  imports: [PageHeader],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
