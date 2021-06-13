import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { ShareLogininfoService } from './share-logininfo.service'

@Injectable()
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";
  private _keyUrl = "http://localhost:3000/api/key";

  constructor(private http: HttpClient,
              private _router: Router,
              private _logininfo: ShareLogininfoService) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  
  key(Ya) {
    return this.http.post<any>(this._keyUrl, Ya)
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  logoutUser() {
  /*  localStorage.removeItem('token')*/
    this._logininfo.setToken(null)
    this._logininfo.setUsername(null)
    this._router.navigate(['/events'])
  }

  /*getToken() {
    return localStorage.getItem('token')
  }*/

  loggedIn() {
    return !!this._logininfo.getToken()
    
  }
}
