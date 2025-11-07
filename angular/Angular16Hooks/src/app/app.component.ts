import { Component } from '@angular/core';
import { childmodel } from './model/child.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
title: any;
  private number:number  = 1;
  public data:childmodel = {
    id :1 ,
    name : "mihir"
  }
  

  get counter(){
    return this.number;
  }

  
  set counter(value : number) {
    this.number = value;
  }

  increase(){
    this.counter++;
    this.data.id++;
  }


  decrease(){
    this.counter--;
    this.data.id--;
  }
  

}
