import { OnInit } from '@angular/core';
import { Component, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-document-add',
  template:`
     <a class="btn btn-badge btn-product-group" style="border:1px dashed;min-height:auto;width:145px;" (click)="captureDocumentClicking(this)" >
      <img alt="Upload" width="25px" [src]="img">
      <div>
      <label [innerHTML]="label"></label> 
      </div>
    </a>`,
   styles: [`.btn-product-group,
            .btn-product-group:hover,
            .btn-product-group:focus,
            .btn-product-group:active:focus {
            background-color: #ffffff;
            border-radius: 3px;
            position: relative;
            padding: 15px 5px;
            margin: 0 0 10px 10px;
            
            text-align: center;
            color: #666;
            border: 1px solid #ddd;
            font-size: 11px;
            text-decoration: none;
            font-family: Interstate_Light,sans-serif;
                font-weight: 400;
            }
            .btn-product-group:hover {
            color: #444;
            border-color: #aaa;
            }   
            .btn-product-group:active,
            .btn-product-group:focus {
            -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
            -moz-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
            box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
            }
            .btn-product-group div {
                margin-top: 10px;
                white-space: normal;
                line-height: normal;
}`]
})
export class DocumentAddComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
   @Input() img: string = '';
    @Input() label: string = '';
    @Output() captureDocument = new EventEmitter<any>();
    get metadata(): any {
        return [
                { 
                    label: 'img',
                    type: String,
                    default: '',
                    sample: 'assets/icons/upload.png'
                },
                { 
                    label: 'label',
                    type: String,
                    default: '',
                    sample: 'Upload or Scan Document'
                }
            ];
    }

    captureDocumentClicking(content: any){
        this.captureDocument.emit(content);
    }

}
