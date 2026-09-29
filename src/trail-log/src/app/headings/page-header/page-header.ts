import { Component } from '@angular/core';
import { TreeIcon } from '../../widgets/icons/tree-icon';
import { ExternalLink } from '../../widgets/icons/external-link';

@Component({
  imports: [TreeIcon, ExternalLink],
  selector: 'app-page-header',
  styleUrl: './page-header.css',
  templateUrl: './page-header.html',
})
export class PageHeader {}
