import { Injectable } from '@angular/core';
import { UserDetail } from '../models/UserDetail.model';
import { GlobalConstants } from '../models/utils/GlobalConstants';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }
  private current_user_detail: UserDetail;
 
  // private roleName = "";
 
  private preferred_language = GlobalConstants.PREFERRED_LANGUAGE.ENGLISH;





  getPreferredLanguage() {
    console.log("Getting Preferred Lanauge: " + this.preferred_language);
    return this.preferred_language;
  }

  setPreferredLanguage(preferredLanguage) {
    // console.log("Setting Preferred Lanauge to : " + preferredLanguage);
    this.preferred_language = preferredLanguage;
  }
  

  // getRoleName() {
  //   return this.roleName;
  // }

  // setRoleName(roleName) {
  //   this.roleName = roleName;
  // }

 

  getCurrentUserDetail() {
    return this.current_user_detail;
  }

  setCurrentUserDetail(userDetail) {
    this.current_user_detail = userDetail;
  }


  
}
