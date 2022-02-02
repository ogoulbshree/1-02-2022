
import { Location } from '@angular/common';
import { Directive, HostListener, OnInit } from "@angular/core";
@Directive({
  selector: '[appCancelbutton]'
})
export class CancelbuttonDirective implements OnInit {

  ngOnInit() { }

  constructor(private location: Location) {
    //  console.log("Back");
   
  }

  @HostListener('click')
  onClick() {
      
      this.location.back();
  }
}   