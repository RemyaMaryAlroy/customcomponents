import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DocumentAddComponent } from './document-add/document-add.component';
import { DragnddropComponent } from './dragnddrop/dragnddrop.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    DocumentAddComponent,
    DragnddropComponent
	
  ],
  imports: [
    BrowserModule,
	FormsModule,
	ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
