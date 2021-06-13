import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { AuthService } from './auth.service';
import { ShareLogininfoService } from './share-logininfo.service'

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector){}
  intercept(req, next) {
    let sharedloginService = this.injector.get(ShareLogininfoService)
    let tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'bearer ' + sharedloginService.getToken())
      }
    )
    return next.handle(tokenizedReq)
  }

}
