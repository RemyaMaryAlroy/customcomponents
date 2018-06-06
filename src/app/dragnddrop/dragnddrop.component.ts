import { Component, Input, OnInit, ElementRef, EventEmitter, SimpleChanges, forwardRef,HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR,FormsModule,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dragnddrop',
  templateUrl: './dragnddrop.component.html',
  styleUrls: ['./dragnddrop.component.css']
})
export class DragnddropComponent implements OnInit {
 @Input() newItem :string = "";
 dragidcheck1 = null;
dragidcheck2 = null;
dragidcheck3 = null; 
arrowChange1 = null;
  item: Object = {};
  list2 :any= [];
  list1 : any= [{key:'A',name:'A',ascendingSortingFlag:true},{key:'B',name:'B',ascendingSortingFlag:true}];
  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    
  }
   ngOnChanges(changes: SimpleChanges): void {
        if (changes['newItem']) {
		    console.log();
            if (this.newItem != null && this.newItem != undefined && this.list1.find(x => x.key == this.newItem) == undefined) {
			 
                this.list1.push({key: this.newItem, name: this.newItem, ascendingSortingFlag:true});
            }
            else {
                console.log("Undefined or Null detected");
            }
        }
    }
ondrag($event){
    this.dragidcheck1 = $event.target.id;
    this.dragidcheck2 = null;
  }
  
  ondrop($event) {
   if($event.srcElement.id == 'dest' &&  this.dragidcheck2 == null )
   {
    this.list2.push(this.list1[this.dragidcheck1]);
    this.list1.splice(this.dragidcheck1,1);
   }
   this.dragidcheck1= null;
   this.dragidcheck2= null;
   $event.preventDefault();
  }

  ondrag1($event){
   this.dragidcheck2 = $event.target.id;
   this.dragidcheck1 = null;
  }
  
   ondrop1($event) {
    if($event.srcElement.id == 'src' &&  this.dragidcheck1 == null)
    {
      
        this.list1.push(this.list2[this.dragidcheck2]);
        this.list2.splice(this.dragidcheck2,1);
    }  
    this.dragidcheck2 = null;
    this.dragidcheck1= null;
    $event.preventDefault();
   }
   dropdiv1($event){
    let item = this.list2[this.dragidcheck2];
    this.list1.splice($event.srcElement.id,0,item);
    this.list2.splice(this.dragidcheck2,1);
    this.dragidcheck2 = null;
   }
   
   dropdiv($event){ 
    this.item = this.list2[this.dragidcheck3];
    let item2 = this.list1[this.dragidcheck1];
   
     if(item2 != null)
     {
      this.list2.splice($event.srcElement.id,0,item2);
      this.list1.splice(this.dragidcheck1,1);
      this.dragidcheck1 = null;
     }
     else{
      this.list2.splice(this.dragidcheck3,1);
      this.list2.splice($event.srcElement.id,0,this.item);
      this.dragidcheck3 = null;
     }
	}
	 getdragdiv($event)
   {
    this.dragidcheck3 = $event.srcElement.id;
   }

   checkid(ind)
   {
     this.arrowChange1=ind.target.id;
   }

   checkColor(i){
      if (this.arrowChange1 == i)
        return '#0095ff47';
    else
       return 'white';
   }

   arrowCheck(check){
    if (check == 'down')
    {
       this.list2[this.arrowChange1].ascendingSortingFlag = false;
    }
    else if(check == 'up')
    {
      this.list2[this.arrowChange1].ascendingSortingFlag = true;
    }
   }

   getArrow(i){
      let arrow ="glyphicon glyphicon-arrow-up";
      let arrow1 ="glyphicon glyphicon-arrow-down";
      if(this.list2[i].ascendingSortingFlag == true)
        return arrow;
      else if (this.list2[i].ascendingSortingFlag == false)
       return arrow1;      
   }
   
   modalclose(){
     this.list2 = [];
   }

  @HostListener('dragover', ['$event'])
  onDragOver(ev) {
      ev = ev || event;
      ev.preventDefault();
  }
}
