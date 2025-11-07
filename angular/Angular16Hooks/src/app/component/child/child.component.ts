import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { childmodel } from 'src/app/model/child.model';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnChanges {
  @Input() myCounter !: number;
  @Input() childModel !: childmodel;

  constructor(){
    console.log("constructor of child called")
  }

  public changeLog:string[] = [];

  ngOnChanges(changes : SimpleChanges):void{
  // for(const propName in changes){

  //   const change: SimpleChange = changes[propName];
  //   const current = JSON.stringify(change.currentValue);
  //   const previous = JSON.stringify(change.previousValue);

  //   this.changeLog.push(
  //     `ngOnChange ${propName} : currentValue = ${current} , previousValue = ${previous}  , firstChange  = ${change.firstChange}`)

  // }
  console.log(SimpleChange);

  }

  ngOnInit():void{
    console.log("child Onit called");
  }

  ngDocheck(){
    
  }

}
