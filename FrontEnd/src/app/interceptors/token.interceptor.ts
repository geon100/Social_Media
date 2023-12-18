import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const usertoken=localStorage.getItem('userToken')
    const admintoken=localStorage.getItem('adminToken')
    if(request.url.includes('admin')){
    const newReq=request.clone({
      setHeaders:{
        Authorization:`Bearer ${admintoken}`
      }
    })
    return next.handle(newReq);
  }else{
    const newReq=request.clone({
      setHeaders:{
        Authorization:`Bearer ${usertoken}`
      }
    })
    return next.handle(newReq);
  }
}
}
