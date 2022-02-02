import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { Router } from '@angular/router';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { FieldDetail } from 'src/app/models/utils/FieldDetail.model';
import { GlobalConstants } from 'src/app/models/utils/GlobalConstants';
import { DBService } from 'src/app/services/dbservice.service';
import { GoogleService, GoogleObj } from 'src/app/services/google.services';
import { UiService } from 'src/app/services/ui.service';

/* import translate, { parseMultiple } from 'google-translate-open-api'; */
@Component({
  selector: 'app-editformfields',
  templateUrl: './editformfields.component.html',
  styleUrls: ['./editformfields.component.css'],
  providers: [GoogleService]
})
export class EditformfieldsComponent implements OnInit {

  componentNameArr: string[] = [];
  currentFieldDetailArr: FieldDetail[] = [];
  currentFieldDetail: FieldDetail;
  componentName: string;
  currentFieldValue: string;
  currentLanguage:string;

  public googleObj: GoogleObj = new GoogleObj();
  public key: string = "AIzaSyC1pvAVod6kZa5g8LOhArHrAchbLHEXUd0";
  result: any;
  // api = "AIzaSyC1pvAVod6kZa5g8LOhArHrAchbLHEXUd0";
  // googleTranslate = require('google-translate')(api);
  // tmpCurrentFieldDetail: string;

  constructor(private _router: Router, private _dbService: DBService,private _google: GoogleService,public _uiservice: UiService) {
  }

  async ngOnInit() {
      this.componentNameArr = GlobalConstants.LANDING_PAGE.LANDING_PAGE_LABELS;
      this.componentName = this.componentNameArr[0];
      this.currentFieldDetail = new FieldDetail();
      this.fillFieldDetailsForComponent(this.componentName);
  }

  async fillFieldDetailsForComponent(component_name) {
      let result = await this._dbService.getFieldDetailsForComponent(component_name).toPromise();
     // CustomLogger.logStringWithObject("getFieldDetailsForComponent:result::", result);
      this.currentFieldDetailArr = result["data"];
      if (this.currentFieldDetailArr != null && this.currentFieldDetailArr.length > 0)
          this.currentFieldDetail = this.currentFieldDetailArr[0];
      else 
          this.currentFieldDetail = new FieldDetail();
  }

  onSelectComponentChange() {
      //CustomLogger.logStringWithObject("Will fetch fields for component:", this.componentName);
      this.fillFieldDetailsForComponent(this.componentName);
      this.currentLanguage = "";
      this.currentFieldValue = '';
  }

  onSelectFieldChange() {
    //CustomLogger.logStringWithObject("currentFieldDetail::", this.currentFieldDetail);
    this.currentLanguage = "";
    this.currentFieldValue = '';
    // CustomLogger.logStringWithObject("tmpCurrentFieldDetail::", this.tmpCurrentFieldDetail);
      // this.currentFieldDetail= fieldDetail;
  }

  onLanguageChange(){
  /*   CustomLogger.logString("currentLanguage:"+ this.currentLanguage); */
    if(this.currentLanguage == "en") this.currentFieldValue = this.currentFieldDetail.en;
    else if(this.currentLanguage == "ar") this.currentFieldValue = this.currentFieldDetail.ar;
    else if(this.currentLanguage == "zh") this.currentFieldValue = this.currentFieldDetail.zh;
    else if(this.currentLanguage == "es") this.currentFieldValue = this.currentFieldDetail.es;
    else if(this.currentLanguage == "fr") this.currentFieldValue = this.currentFieldDetail.fr;
    else if(this.currentLanguage == "ru") this.currentFieldValue = this.currentFieldDetail.ru;
    else if(this.currentLanguage == "ko") this.currentFieldValue = this.currentFieldDetail.ko;
    else if(this.currentLanguage == "ja") this.currentFieldValue = this.currentFieldDetail.ja;
    else if(this.currentLanguage == "tr") this.currentFieldValue = this.currentFieldDetail.tr;
   /*  CustomLogger.logStringWithObject("Field Detail:", this.currentFieldDetail);
    CustomLogger.logString("Field Value:" +this.currentFieldValue) */;
  }

  async translateToAllLanguagesFromEnglish(stringToTranslate) {
    try {   
     
      this.currentFieldDetail.ar = await this.translateIndividualField(stringToTranslate, "ar");
      this.currentFieldDetail.zh = await this.translateIndividualField(stringToTranslate, "zh");
      this.currentFieldDetail.es = await this.translateIndividualField(stringToTranslate, "es");
      this.currentFieldDetail.fr = await this.translateIndividualField(stringToTranslate, "fr");
      this.currentFieldDetail.ru = await this.translateIndividualField(stringToTranslate, "ru");
      this.currentFieldDetail.ko = await this.translateIndividualField(stringToTranslate, "ko");
      this.currentFieldDetail.ja = await this.translateIndividualField(stringToTranslate, "ja");
      this.currentFieldDetail.tr = await this.translateIndividualField(stringToTranslate, "tr");
     
    
   
      // this.currentFieldDetail.hi = await this.translateIndividualField(stringToTranslate, "hi");
        
      
    } catch (error) {
      CustomLogger.logStringWithObject("ERROR", error);
    }
    
  }

  async translateIndividualField(stringToTranslate, targetLanguage){

    let obj = new GoogleObj();
    obj.q = stringToTranslate;
    obj.target = targetLanguage;
    obj.source = "en"; //whatever the source language is
   // CustomLogger.logStringWithObject("Converting to.... ", obj);
    let res  = await this._google.translate(obj, this.key).toPromise();
    return res["data"].translations[0].translatedText;
  }

  translateField(){
    										

   
      // this.googleObj.target = "hi";
      this.googleObj.q = this.currentFieldValue;
      this.googleObj.target = "hi"
      this.googleObj.source = "en"; //whatever the source language is
      //CustomLogger.logStringWithObject("GGGGGG", this.googleObj);
      this._google.translate(this.googleObj, this.key).subscribe(
        (res: any) => {
          /* this.btnSubmit.disabled = false; */
          this.result = res.data.translations[0].currentFieldDetail;
        },
        err => {
          console.log(err);
        }
      );
    }     

/* 
       try {
         CustomLogger.logString("currentLanguage:::" + this.currentLanguage);
         CustomLogger.logString("this.currentFieldValu:::" + this.currentFieldValue);
        
          if(this.currentLanguage == "en"){
            this.currentFieldDetail.en = this.currentFieldValue; 
           
          }
           else if(this.currentLanguage == "ar"){
            this.currentFieldDetail.ar = this.currentFieldValue; 
        
        } 
        else if(this.currentLanguage == "zh"){
         
            this.currentFieldDetail.zh = this.currentFieldValue;
           
         
        } 
       
    }
    
      
      catch (error) 
      {
        CustomLogger.logStringWithObject("ERRR:", error); 
      }
} */



  async onClickUpdate() {
      try {
        //CustomLogger.logStringWithObject("before translation: this.currentFieldDetail::", this.currentFieldDetail);
        //CustomLogger.logStringWithObject("this.currentFieldValue::", this.currentFieldValue);
          // await this.translateField();
          
          let stringToTranslate = this.currentFieldValue;
          //if language selected is not english
          // stringToTranslate = await this.translateIndividualField(this.currentFieldValue, this.currentLanguage);
          //translate the string to english and then call this function
          this.currentFieldDetail.en = stringToTranslate;
          await this.translateToAllLanguagesFromEnglish(stringToTranslate);
        //  CustomLogger.logStringWithObject("after translation; this.currentFieldDetail::", this.currentFieldDetail);
          let result = await this._dbService.updateFieldDetail(this.currentFieldDetail).toPromise();
         // CustomLogger.logStringWithObject("updateFieldDetail:result:", result);
          CustomMisc.showAlert("Successfully updated the field");
      } catch (error) {
          CustomMisc.showAlert("Error in updating the field:" + error, true);
      }

  }
  onClickReset(){}
}