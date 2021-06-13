import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events = [];
  searchbook = {};
  searchtopass = {};

  searchhappened = false;

  constructor(private _eventService: EventService,private _authService: AuthService) { }

  ngOnInit() {

  }
  
  searchbooks(value){
    this.searchhappened = true;
    this.searchbook = value;
    //console.log(this.searchbook);
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

  // backend logic

    this._eventService.getEvents(this.searchtopass)
    .subscribe(
      res => {
        //console.log(res);
        
        this.events = res
        
      },
      err => {
        console.log(err)
      }
    )
    
  }

}
