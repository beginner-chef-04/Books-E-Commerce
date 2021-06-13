import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
import { ShareLogininfoService } from '../share-logininfo.service'
import { EventService } from '../event.service';

@Component({
  selector: 'app-special-events-view-profile',
  templateUrl: './special-events-view-profile.component.html',
  styleUrls: ['./special-events-view-profile.component.css']
})
export class SpecialEventsViewProfileComponent implements OnInit {

  public username_vp = '';
  public balance_vp = 0;
  public address_vp =  '';
  public email_vp = '';
  public books_bought_vp = 0;
  public books_sold_vp = 0;
  public boos_on_sale_vp = 0;
  token_vp;
  public view1 = [];
  public view2 = [];
  public view3 = [];
  datatopass = {};
  constructor(private _authService: AuthService,
              private _router: Router,
              private _logininfo: ShareLogininfoService,
              private _eventserv: EventService) { }

  ngOnInit() {
    this.token_vp = this._logininfo.getToken();
    this.username_vp = this._logininfo.getUsername();
    this.balance_vp = this._logininfo.getBalance();
    this.datatopass["username"] = this.username_vp; 
    console.log(this.datatopass);

    this._eventserv.viewprofile(this.datatopass).subscribe(
      data => {
        this.address_vp = data[0].location;
        this.email_vp = data[0].email;
       //console.log(data);
      },
      err => {
        console.log(err);
        
      }
    )

    this._eventserv.view1(this.datatopass).subscribe(
      data => {
        this.view1 = data;
        this.boos_on_sale_vp = this.view1.length;
       //console.log(data);
      },
      err => {
        console.log(err);
        
      }
    )

    this._eventserv.view2(this.datatopass).subscribe(
      data => {
        this.view2 = data;
        this.books_sold_vp = this.view2.length;
        //console.log(data);
        
      },
      err => {
        console.log(err);
        
      }
    )

    this._eventserv.view3(this.datatopass).subscribe(
      data => {
        this.view3 = data;
        this.books_bought_vp = this.view3.length;
        
       //console.log(data);
      },
      err => {
        console.log(err);
        
      }
    )
    //console.log('vp ' + this.username_vp + this.token_vp);
  }

}
