import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { User } from "../../models/user";
import { UserService } from "src/app/services/user.service";
import { AlertService } from "../../services/alert.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"]
})
export class UserDetailsComponent implements OnInit {
  userForm: FormGroup;
  submitted: Boolean = false;
  loading: Boolean = false;
  user: User;
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", Validators.required],
      telephone: ["", Validators.required],
      telephonePrefix: ["", Validators.required],
      countryIso: ["", Validators.required]
    });
    this.getUser();
  }
  get f() {
    return this.userForm.controls;
  }
  getUser() {
    this.user = this.authService.currentUserValue;

    this.userForm.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      password: this.user.password,
      email: this.user.email,
      telephone: this.user.telephone,
      telephonePrefix: this.user.telephonePrefix,
      countryIso: this.user.countryIso
    });
  }

  onUpdate() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.userService.edit(this.userForm.value).subscribe(
      user => {
        //
        this.submitted = false;
        if (user.success) {
          this.alertService.success("user details changed seccessfuly!!");
        } else {
          this.alertService.error("error in edit");
        }
      },
      error => {
        this.alertService.error("error");
        this.loading = false;
      }
    );
  }
}
