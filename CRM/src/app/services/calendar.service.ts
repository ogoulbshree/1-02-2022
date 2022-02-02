import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

   SERVER_URL = environment.SERVER_URL+'/calendar';
  
/*   SERVER_URL = "http://172.23.0.30:3000/api"; */

  constructor(private http:HttpClient) {}

  create(data){
    return this.http.post(this.SERVER_URL + '/create',data);
  }

  // getall(leadId){
  //   return this.http.get(this.baseUrl + '/getall/'+leadId);
  // }
  getall(){
  
    return this.http.get(this.SERVER_URL + '/getall');
  }

  single(id){
    return this.http.get(this.SERVER_URL + '/'+id);
  }

  edit(data){
    return this.http.post(this.SERVER_URL + '/update',data);
  }

  delete(id){
    return this.http.delete(this.SERVER_URL + '/'+id);
  }
}
