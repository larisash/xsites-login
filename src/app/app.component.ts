import { Component } from "@angular/core";
import { LayoutPageComponent } from "../app/layout/layout-page/layout-page.component";
declare var particlesJS: any;
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "xsight-app";

  ngOnInit() {
    particlesJS.load("particles-js", "assets/particles.json", function() {
      console.log("callback - particles.js config loaded");
    });
  }
}
