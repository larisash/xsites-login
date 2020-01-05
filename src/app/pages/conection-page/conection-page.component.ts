import { Component, OnInit } from "@angular/core";

@Component({
  selector: "conection-page",
  templateUrl: "./conection-page.component.html",
  styleUrls: ["./conection-page.component.css"]
})
export class ConectionPageComponent implements OnInit {
  newUser = false;
  constructor() {}

  ngOnInit() {}
  changeToNotAMemeber(event) {
    this.newUser = event;
  }
  changeToMemeber() {
    this.newUser = false;
  }
}
