import { Injectable } from '@angular/core';

@Injectable()
export class ShareLogininfoService {

  token = null;
  username = null;
  balance = 0
  constructor() { }
  setToken(token){
    this.token = token;
  }
  getToken(){
    return this.token
  }
  setUsername(username){
    this.username = username
  }
  getUsername(){
    return this.username
  }
  setBalance(balance){
    this.balance = balance
  }
  getBalance(){
    return this.balance
  }
  
}
