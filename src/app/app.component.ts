import { Component } from '@angular/core';
import { PaginationComponent } from './pagination/pagination.component';
import { DocumentAddComponent } from './document-add/document-add.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  totalNoOfPages;
  _currentPage;
}
