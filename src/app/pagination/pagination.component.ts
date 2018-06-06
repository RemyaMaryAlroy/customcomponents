import { Component, Input, OnInit,Output, ElementRef, EventEmitter, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR,FormsModule,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
   @Input() _currentPage: number = 1;
    @Input() totalNoOfPages: number = 1;
    @Input() isLastIndex:boolean=false;
    @Output() _currentPageChange = new EventEmitter<number>();
    @Output() fetchNextSetofPages=new EventEmitter<any>();

    paginationArray = [];
    continueMarker = '...';
    get metadata(): any {
        return [
            {
                label: 'totalNoOfPages',
                type: Number,
                default: 1
            },
            {
                label: '_currentPage',
                type: Number,
                default: 1,
                output: true,
            }
        ];
    }

    constructor(private elRef: ElementRef) {
       
    }
    ngOnInit() {
        this.arrangePagination();
    }

    previousPage() {
        if (this._currentPage != 1) {
            this._currentPage -= 1;
            this._currentPageChange.emit(this._currentPage);
            this.arrangePagination();
        }
        else {
            console.log("Reached Home Page");            
        }
    }
    nextPage() {
        if (this._currentPage < this.totalNoOfPages) {
            this._currentPage += 1;
            this._currentPageChange.emit(this._currentPage);
            this.arrangePagination();
        }
        else if(this._currentPage==this.totalNoOfPages && !(this.isLastIndex)){
            console.log("Reached Last Page and invoking to get next set of pages");
            this.fetchNextSetofPages.emit(true);
        }
        else{
            console.log("Reached Last Page");
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['totalNoOfPages']) {
            if (this.totalNoOfPages != null && this.totalNoOfPages != undefined) {
                this.arrangePagination();
            }
            else {
                console.log("Undefined or Null detected");
            }
        }
    }

    clickedPage(page: any) {
        if (page != "..." && page != this._currentPage) {
            console.log("ClickedPage-->" + page);
            this._currentPage = page;
            this.propagateChange(page);
            this._currentPageChange.emit(page);
            this.arrangePagination();
        }
    }

    findCurrentPage(page: any) {
        if (page != "...") {
            return this._currentPage == page ? "active" : "hidden-xs";
        }
    }

    arrangePagination() { //In Every row 10 Pages can be navigaed. Hence used 10 As a constant to do not change any pagination
        this.paginationArray = [];
        // this.totalNoOfPages = Math.floor(this.noOftotalRows / this.rowsPerPage) + ((this.noOftotalRows % this.rowsPerPage) > 0 ? 1 : 0);       
        console.log("Total Pages" + this.totalNoOfPages);
        for (let val = 0; val < this.totalNoOfPages; val++) {
            this.paginationArray.push(val + 1);
        }
        if (this.totalNoOfPages <= 10) {
            console.log("Pagination as its");
        }
        else if (this.totalNoOfPages > 10 && this._currentPage <= 10) {
            let lastValue = this.paginationArray[this.paginationArray.length - 1];
            if (this._currentPage == 10 && this.totalNoOfPages == 11) {
            }
            else if (this._currentPage == 10 && this.totalNoOfPages > 11) {
                this.paginationArray = (this.paginationArray.slice(0, 10));
                this.paginationArray.push(this.continueMarker, lastValue);
            }
            else {
                this.paginationArray = (this.paginationArray.slice(0, 9));
                this.paginationArray.push(this.continueMarker, lastValue);
            }
        }
        else if (this.totalNoOfPages > 10 && ((this.totalNoOfPages - this._currentPage) <= 9)) {
            let firstValue = this.paginationArray[0];
            this.paginationArray = (this.paginationArray.slice(this.totalNoOfPages - 10, this.paginationArray.length));
            this.paginationArray.unshift(firstValue, this.continueMarker);
        }
        else if (this.totalNoOfPages > 20 && !(this._currentPage <= 10) && !((this.totalNoOfPages - this._currentPage) <= 9)) {
            let firstValue = this.paginationArray[0];
            let lastValue = this.paginationArray[this.paginationArray.length - 1];
            let showsMe = []; for (let i = this._currentPage - 3; i <= this._currentPage + 3; i++) {
                showsMe.push(i);
            }
            this.paginationArray = showsMe;
            this.paginationArray.unshift(firstValue, this.continueMarker)
            this.paginationArray.push(this.continueMarker, lastValue);
        }
        console.log(this.paginationArray + "PArray");

        //Emit the value to parent to show the records as per current case - so emiiter here.. thats with current page
    }

    getPrevArrowClasses() {
        let previousArrow = "prev-arrow";
        return this._currentPage < 2 ? previousArrow + " disabled" : previousArrow;
    }
    getNextArrowClasses() {
        let nextArrow = "next-arrow";
        return (this._currentPage == this.totalNoOfPages && this.isLastIndex )? nextArrow + " disabled" : nextArrow;
    }

    get value() {
        return this._currentPage;
    }
    set value(val) {
        if (this._currentPage != val) {
            //set the value really
            this._currentPage = val;

        }
    }



    writeValue(value: any) {
        if (value !== undefined) {
            this.value = value;
        }
    }

    propagateChange = (_: any) => { };

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() { }
}
