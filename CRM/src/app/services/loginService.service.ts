import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DBService } from './dbservice.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    headerOptions: any = null;
    _isLoggedIn: boolean = false;
    authSub = new Subject<any>();

    constructor(private _http: HttpClient, private _dbService: DBService) {
    }


    updateAuthStatus(value: boolean) {
        this._isLoggedIn = value
        this.authSub.next(this._isLoggedIn);
        localStorage.setItem('isLoggedIn', value ? "true" : "false");
    }

    getAuthStatus() {
        this._isLoggedIn = localStorage.getItem('isLoggedIn') == "true" ? true : false;
        return this._isLoggedIn
    }

    logoutUser() {
        try {
            this._isLoggedIn = false;
            this.authSub.next(this._isLoggedIn);
            localStorage.setItem('isLoggedIn', "false");
        } catch (error) {
            console.log(error);
        }

    }
}
