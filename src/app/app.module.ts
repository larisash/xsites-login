import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { RegestrationComponent } from "./components/regestration/regestration.component";
import { UserUpdateComponent } from "./components/user-update/user-update.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";
import { LayoutPageComponent } from "./layout/layout-page/layout-page.component";
import { ConectionPageComponent } from "./pages/conection-page/conection-page.component";
import { UserPageComponent } from "./pages/user-page/user-page.component";
import { AlertsComponent } from "./components/alerts/alerts/alerts.component";
import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { ErrorInterceptor } from "./helpers/error.interspetor";
import { JwtInterceptor } from "./helpers/jwt.interspetor";
import { HttpClientModule } from "@angular/common/http";
// import { HttpHeaders } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegestrationComponent,
    UserUpdateComponent,
    UserDetailsComponent,
    LayoutPageComponent,
    ConectionPageComponent,
    UserPageComponent,
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

    // provider used to create fake backend
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
