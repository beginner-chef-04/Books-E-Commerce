import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {};
  name_error = null;


  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }


  name_rules()
  {
    console.log('button onclick works!!');
    window.alert('The Username should contain only alphanumeric values and its length should be between 2 to 10 !!');
  }
  email_rules()
  {
    window.alert("The Email should be a google mail or charusat student mail Id !!");
  }
  password_rules()
  {
    window.alert("The Password should contain atleast 5-6 alphabets followed by a Special Character and then a digit !!");
  }
  registerUser(value) {
            this.registerUserData = value
            console.log(this.registerUserData);
            this._auth.registerUser(this.registerUserData)
            .subscribe(
              res => {
                /*console.log(res.token);
                console.log(res.already_exist);
                if('token' in res){
                  console.log('token exists !');
                }
                if('already_exist' in res){
                  console.log('already_exist exists !');
                }*/
                if('token' in res){
                  this.name_error = null;
                  this._router.navigate(['/special'])
                }
                if('already_exist' in res){
                  this.name_error = res.already_exist;
                }
        
              },
              err => console.log(err)
            )      
    


}/*
  registerUser(value) {
    console.log(value);
   
  }*/




}
