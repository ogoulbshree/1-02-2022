import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GoogleService {
  constructor(private _http: HttpClient) { }

  translate(obj: GoogleObj, key: string) {
    //console.log("Google service:::", obj);
    // let u = url + key;
  /*   console.log("key",url+key); */
   /*  return this._http.post(url + key, obj); */
   let u = "https://translation.googleapis.com/language/translate/v2?key=AIzaSyC1pvAVod6kZa5g8LOhArHrAchbLHEXUd0";
   let newUrl = u + "&target=" + obj.target + "&q=" + obj.q;
   //console.log("URL:::", newUrl);
   return this._http.get(newUrl);
  //  return this._http.post(newUrl, obj);
  //  return this._http.post("https://translation.googleapis.com/language/translate/v2?key=AIzaSyC1pvAVod6kZa5g8LOhArHrAchbLHEXUd0&target=hi&q=hi", obj);

  }
}

const url = 'https://translation.googleapis.com/language/translate/v2?key=';

export class GoogleObj {
  q: string;
  source: string = 'en';
  target: string = 'es';
  format: string = 'text';

  constructor() { }
}



// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable()
// export class GoogleService {
//   constructor(private _http: HttpClient) { }
//   googleApiKey = "AIzaSyC1pvAVod6kZa5g8LOhArHrAchbLHEXUd0";
//   translate(obj: GoogleObj) {
//     console.log("obj:::", obj);
//     return this._http.post(url + this.googleApiKey, obj);
//   }
// }

// const url = 'https://translation.googleapis.com/language/translate/v2?key=';

// export class GoogleObj {
//   textToTranslate: string;
//   readonly source: string = 'en';
//   readonly target: string = 'es';
//   readonly format: string = 'text';

//   constructor() { }
// }
