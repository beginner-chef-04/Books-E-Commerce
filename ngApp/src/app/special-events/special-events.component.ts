import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';
import { ShareLogininfoService } from '../share-logininfo.service'

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {
  

  public specialEvents = [];
  public username = '';
  public balance = 0;
  token
  searchbook = {};
  searchtopass = {};
  buybookdata = {};
  //public buyclass: string = 'buybutton'
  //bought = 'Buy'
  //index_no;
  books_fetched_bysearch = 0;
  buybuttontracer = [];
  eachbuybuttonjson = {};
  searchhappened = false;
  constructor(private _eventService: EventService,
              private _router: Router,
              private _authService: AuthService,
              private _logininfo: ShareLogininfoService) { }


  ngOnInit() {
    this.token = this._logininfo.getToken()
    this.username = this._logininfo.getUsername()
    this.balance = this._logininfo.getBalance()
    console.log('Special Events Component\nOriginal Username ' + this.username + '\nOriginal Balance '+ this.balance + '\nOriginal token ' + this.token);
  }

  buy(event,i){
    event.target.disabled = true;
    /*this.buyclass = 'buybuttonvisited'*/
    /*this.bought = 'Bought'*/
    /*console.log(this.buybuttontracer);
    console.log('i='+i);
    console.log(this.buybuttontracer[i]);*/
    this.buybuttontracer[i].changecolor = true;
    this.buybuttontracer[i].colorvalue = 'buybuttonvisited';  // buybuttonvisited

    this.buybuttontracer[i].changetext = true;
    this.buybuttontracer[i].textvalue = 'Bought'; //  Bought buybuttonvisited   
    
    //backend logic
    this.buybookdata["username"] = this.username
    this.buybookdata["balance"] = this.balance
    this.buybookdata["bookdetails"] = this.specialEvents[i];
    console.log(this.buybookdata);
    this._eventService.buy_book(this.buybookdata).subscribe(
      data => {
        console.log(data);
        this.balance = data.balance_return;
        this._logininfo.setBalance(data.balance_return); 

      },
      err => {
        console.log(err); 
      }
    )
  }

  searchbooks(value){
    this.searchhappened = true;
    this.searchbook = value;
    //console.log(this.searchbook);
    /*if(this.searchbook.subject==null)console.log('null');
    if(this.searchbook.subject==undefined)console.log('undefined');*/
    if(this.searchbook["subject"]!=''){
      //console.log('subj not null');
      this.searchtopass["subject"] = this.searchbook["subject"]; 
    }else{
      this.searchtopass["subject"] = '%'; 
    }

    if(this.searchbook["branch"]!=''){
      //console.log('branch not null');
      this.searchtopass["branch"] = this.searchbook["branch"]; 
    }else{
      this.searchtopass["branch"] = '%'; 
    }

    if(this.searchbook["price"]!=''){
      //console.log('price not null');
      if(this.searchbook["price"]=='1'){
        this.searchtopass["lowprice"] = '0'; 
        this.searchtopass["highprice"] = '500';
      } 
      if(this.searchbook["price"]=='2'){
        this.searchtopass["lowprice"] =  '500';
        this.searchtopass["highprice"] = '1000';
      }  
      if(this.searchbook["price"]=='3'){
        this.searchtopass["lowprice"] = '1000';
        this.searchtopass["highprice"] = '10000';
      }    
    }else{
      this.searchtopass["lowprice"] = '0';
      this.searchtopass["highprice"] = '10000';      
    }     
    
  //console.log(this.searchtopass);
  this.searchtopass["username"] = this.username

    // backend logic
  this._eventService.search_book(this.searchtopass).subscribe(
      data => {
          //console.log(data);
          this.specialEvents = data; 
          this.books_fetched_bysearch = this.specialEvents.length;
          for(let i=0;i<this.books_fetched_bysearch;i++){
            //console.log(this.books_fetched_bysearch);
              this.eachbuybuttonjson["id"] = i;
              this.eachbuybuttonjson["changecolor"] = false;
              this.eachbuybuttonjson["colorvalue"] = 'buybutton';
              this.eachbuybuttonjson["changetext"] = false;
              this.eachbuybuttonjson["textvalue"] = 'Buy';
              //console.log('inner for'+i);
              this.buybuttontracer.push(this.eachbuybuttonjson);
              this.eachbuybuttonjson = {};

          }
        },
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
    )
    
  }

}
