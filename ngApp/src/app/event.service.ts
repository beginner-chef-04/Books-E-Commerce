import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class EventService {

  private _eventsUrl = "http://localhost:3000/api/events";
  private _uploadURL = "http://localhost:3000/api/specialupload";
  private _searchURL = "http://localhost:3000/api/specialsearch";
  private _buybookURL = "http://localhost:3000/api/specialbuy";

  private _viewprofileURL = "http://localhost:3000/api/specialviewprofile";
  private _view1URL = "http://localhost:3000/api/specialviewprofilenotsold";
  private _view2URL = "http://localhost:3000/api/specialviewprofilesold";
  private _view3URL = "http://localhost:3000/api/specialviewprofilebought";
  
  constructor(private http: HttpClient) { }

  getEvents(data) {
    return this.http.post<any>(this._eventsUrl,data)
  }
  postupload(data) {
    return this.http.post<any>(this._uploadURL,data)
  }  
  search_book(data) {
    return this.http.post<any>(this._searchURL,data)
  }    
  
  buy_book(data) {
    return this.http.post<any>(this._buybookURL,data)
  }

  view1(data) {
    return this.http.post<any>(this._view1URL,data)
  }
  view2(data) {
    return this.http.post<any>(this._view2URL,data)
  }   
  view3(data) {
    return this.http.post<any>(this._view3URL,data)
  }  
  viewprofile(data) {
    return this.http.post<any>(this._viewprofileURL,data)
  }  
}
