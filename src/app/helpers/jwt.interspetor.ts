import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let currentUserToken = this.authService.userToken;
    if (currentUserToken) {
      request = request.clone({
        setHeaders: {
          auth_token: `${currentUserToken}`,
          "Content-Type": "application/json"
        }
      });
    }

    return next.handle(request);
  }
}
