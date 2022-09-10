import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

const jwt = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.apiBaseUrl;
  userInfo = new BehaviorSubject<any>(null)

  constructor(private http: HttpClient, private router: Router) { }

  login(form: any) {
    return this.http.post(`${this.url}/auth/login`, form)
  }

  signup(form: any) {
    return this.http.post(`${this.url}/auth/signup`, form)
  }
  
  isTokenAuthenticated_decode () {
    let token = localStorage.getItem('token')
    if(token) {
      let decodedToken: any = jwt.decodeToken(token);

      let isValid = moment().isBefore(moment.unix(decodedToken.exp))

      console.log(decodedToken)
      console.log(isValid)
      if(!isValid) {
        this.router.navigateByUrl('/auth/login')
      } else {
        this.userInfo.next(decodedToken)
        // this.userInfo.id = decodedToken.id
        // this.userInfo.username = decodedToken.username
        // this.userInfo.firstName = decodedToken.firstName
        // this.userInfo.lastName = decodedToken.lastName
      }
    }
  }
}
