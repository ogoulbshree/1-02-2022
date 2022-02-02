import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  /* SERVER_URL = "http://172.23.0.30:3000/api"; */

 SERVER_URL = environment.SERVER_URL; 

  constructor(private http:HttpClient) {

  }
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

  create(data){
    return this.http.post(this.SERVER_URL + '/create',data);
  }

  getall(){
    return this.http.get(this.SERVER_URL + '/getall');
  }

  single(id){
    return this.http.get(this.SERVER_URL + '/single'+id);
  }

  edit(data){
    return this.http.post(this.SERVER_URL + '/update',data);
  }

  delete(id){
    return this.http.delete(this.SERVER_URL + '/delete/'+id);
  }

  saveimage(file) {
    var  fd = new FormData();
    fd.append('file', file);
    return this.http.post(this.SERVER_URL + '/save',fd);
  }

  

/* uploadFile(formData: FormData) {
  return this.http.post(this.SERVER_URL + '/uploadFile', formData);
} */
  download(date){
    return this.http.post(this.SERVER_URL + '/download',date,{
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }
}
