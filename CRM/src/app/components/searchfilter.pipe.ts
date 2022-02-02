import { Pipe, PipeTransform } from '@angular/core';
import { UserDetail } from '../models/UserDetail.model';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(userDetail:UserDetail[], searchString:string): UserDetail[] {
    if(!userDetail || ! searchString){
      return userDetail;
    }
    return userDetail.filter(userdetail =>
      userdetail.username.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) ||
      userdetail.email.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()))

      
      
    }
  } 
 /*  transform(value:any, searchString:any): any {
if(value.length ===0){
  return value
}
return value.filter(function(search){


  return search.username.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) > -1
}


);

  }
}
 */