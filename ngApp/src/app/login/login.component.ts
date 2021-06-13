import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
import { ShareLogininfoService } from '../share-logininfo.service'




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {};
  invalid_uname = null;
  invalid_pwd = null;
  K = null;
  Yb = null;
  Ya = {Ya: null};
  Xa = null;
  q = null;

  constructor(private _auth: AuthService,
              private _router: Router,
              private _logininfo: ShareLogininfoService) { }

  ngOnInit() {

    //caculate Ya
    var q = 11;
    this.q = q;
    var a = 4;
    console.log('Variable q and a  : '+q+' '+a);
    var Xa = Math.floor(Math.random()*10)+1;  //random bet. 1 to 10
    this.Xa = Xa;
    console.log('Random Xa generated : '+ Xa);
    var Ya = (a**Xa)%q; 
    console.log('Ya ' +Ya); 
     this.Ya.Ya = Ya;
    this._auth.key(this.Ya).subscribe(
      res => {
        if('Yb' in res){
          this.Yb = res.Yb;
          console.log('Yb sent by the server : ' +this.Yb); 
        }
      },
      err => console.log(err)
    )

  }

  loginUser () {

    //use Yb to calculate Key
    this.K = (this.Yb**this.Xa)%this.q;
    console.log('Generated Key K ' + this.K);    
 

    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => { 
        if('token' in res){
          //console.log(res);
          console.log('Encrypted Username Recevied ' + res.split_username);
          console.log('Encrypted Balance Recevied ' + res.split_balance);
          console.log('Encrypted Token Recevied ' + res.split_token);     
          
          





          
          this.invalid_uname = null;
          this.invalid_pwd = null;
          /*localStorage.setItem('token', res.token)*/
          this._logininfo.setToken(res.token)   
          this._logininfo.setUsername(res.username)
          this._logininfo.setBalance(res.balance)
          this._router.navigate(['/special'])
        }
        if('invalid_username' in res){
          this.invalid_pwd = null;
          this.invalid_uname = res.invalid_username;
        }
        if('invalid_password' in res){
          this.invalid_uname = null;
          this.invalid_pwd = res.invalid_password;
        }        

      },
      err => console.log(err)
    ) 
  }

}
