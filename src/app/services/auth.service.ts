import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { User } from "../models/user";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthService {
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  BASE_URL = "https://api-dev-all.antelopesystem.com/SignalsServer/client/api";
  userToken: any;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  login(email: string, password: string) {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    return this.http
      .post<any>(`${this.BASE_URL}/users/authenticate`, formData)
      .pipe(
        map(user => {
          const isLoginSucceful = !!(
            user &&
            user.result &&
            user.result.authToken
          );
          if (isLoginSucceful) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes

            this.userToken = user.result.authToken;
            this.setUser(user);
            this.setToken(this.userToken);
          }

          return user;
        })
      );
  }
  setUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user.result));
    this.currentUserSubject.next(user.result);
  }
  setToken(token) {
    localStorage.setItem("token", JSON.stringify(token));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    this.currentUserSubject.next(null);
    this.router.navigate(["/login"]);
  }
}
