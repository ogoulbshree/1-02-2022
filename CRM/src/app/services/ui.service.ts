
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UiService {

    constructor(public jwtHelper: JwtHelperService) { }

    public langDataSource = new BehaviorSubject('en');
    langValue = this.langDataSource.asObservable();
    
    private dashboardTypeSource = new BehaviorSubject<any>({});
    dashboardType = this.dashboardTypeSource.asObservable();


    public userDataSource = new BehaviorSubject(null);
    userValue = this.userDataSource.asObservable();

    setdashboardType(val) {
        this.dashboardTypeSource.next(val);
    }
    public isAuthenticated(): boolean {
        const token = localStorage.getItem('jwt');
        // Check whether the token is expired and return
        // true or false
        return !this.jwtHelper.isTokenExpired(token);
    }

    //update the observable value from token
    updateSessionUser(){
        const token = localStorage.getItem('jwt');
        this.userDataSource.next(this.jwtHelper.decodeToken(token));
    }
}
