import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { FaqDetail } from 'src/app/models/FaqDetail.model';
import { DBService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  faqs:FaqDetail[]=[];
  questionsSearch="";
  isShown: boolean = false ; // hidden by default
  currentIndex;
  constructor(public _dbService:DBService) { }

  ngOnInit() {
    this._dbService.getAllFaq().subscribe((faq:any) => {
      this.faqs= faq.data
   
    })
  }
 

  expand(index) {
    if(this.currentIndex === index) {
      this.currentIndex = null;
      return;
    }
    this.currentIndex = index;
  }

  searchQuestions(type){
      if(type == 'clear' && !this.questionsSearch) this.ngOnInit();
      
      else if(type == 'search' && this.questionsSearch)
      this._dbService.searchQuestions(this.questionsSearch).subscribe((item:any)=>{
        this.faqs=item.data
      })
  }

}
