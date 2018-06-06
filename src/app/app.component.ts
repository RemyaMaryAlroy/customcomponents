import { Component } from '@angular/core';
import { PaginationComponent } from './pagination/pagination.component';
import { DocumentAddComponent } from './document-add/document-add.component';
import { DragnddropComponent } from './dragnddrop/dragnddrop.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  totalNoOfPages;
  _currentPage;
  newItem:string;
}
