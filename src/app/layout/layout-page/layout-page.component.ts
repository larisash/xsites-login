import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
// import { AlertsComponent } from "../../components/alerts/alerts/alerts.component";

@Component({
  selector: "layout-page",
  templateUrl: "./layout-page.component.html",
  styleUrls: ["./layout-page.component.css"]
})
export class LayoutPageComponent implements OnInit {
  userName: string = "";
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // this.getUser();
  }

  getUser() {
    if (this.authService.currentUserValue) {
      const { firstName, lastName } = this.authService.currentUserValue;
      return firstName + "  " + lastName;
    }
  }
  logout() {
    this.authService.logout();
  }
}
