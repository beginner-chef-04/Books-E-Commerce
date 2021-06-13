import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router'
import { ShareLogininfoService } from '../share-logininfo.service'
import { AuthService } from '../auth.service';
import { EventService } from '../event.service';


@Component({
  selector: 'app-special-events-upload',
  templateUrl: './special-events-upload.component.html',
  styleUrls: ['./special-events-upload.component.css']
})
export class SpecialEventsUploadComponent implements OnInit {

  uploadBook = {};
  username = '';
  token;
  balance = 0;
  selectedFile: File = null;
  invalid_img = null
  image_url = ''
  upload_suceess = null;
  @ViewChild('nameref') img_reset: ElementRef;

  constructor(private _authService: AuthService,private eventserv: EventService,
    private _router: Router,private _logininfo: ShareLogininfoService) { }

  ngOnInit() {
    this.token = this._logininfo.getToken()
    this.username = this._logininfo.getUsername()
    this.balance = this._logininfo.getBalance()

   /* console.log('upload ' + this.username + this.token);*/
   }

  myfile(event){
    if(event.target.files){
      this.selectedFile = <File>event.target.files[0];
      /*print file details console.log(event.target.files[0]);*/

      if(this.selectedFile.size >= 20000){
        this.invalid_img = 'Size Greater than 20KB !!';
        /*console.log('a');
        console.log(this.img_reset.nativeElement.files); */
        this.img_reset.nativeElement.value = "";  
      /*  if(event.target.files)console.log(event.target.files);
        else console.log('dont exist');         
        console.log(this.img_reset.nativeElement.files);
        console.log('a');*/
      }
      else{
        this.invalid_img = null;
        var filereader = new FileReader();
        filereader.readAsDataURL(this.selectedFile);
        filereader.onload = (event: any)=>{
        this.image_url = event.target.result;
        /*print base64 string of the image console.log( this.image_url);*/
        }
      }
      
    }
    
  }
  clicked(event){
    //event.target.disabled = true;
  }
  onupload(value){
    this.uploadBook = value;
    this.uploadBook["image_url"] = this.image_url
    this.uploadBook["username"] = this.username;
    console.log(this.uploadBook);
    
    this.eventserv.postupload(this.uploadBook).subscribe(
      res => {
        console.log(res);
        this.upload_suceess = res.ok;
      }
      ,
      err => console.log(err)
    )
    
  }


}
