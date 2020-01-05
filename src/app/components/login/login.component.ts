import { Component, OnInit, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { AlertService } from "../../services/alert.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @Output() needToRegesture = new EventEmitter();
  loginForm: FormGroup;
  submitted: Boolean = false;
  loading: Boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  changeToRegestration(event) {
    this.needToRegesture.emit(event);
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.goToUserPage();
  }

  goToUserPage() {
    this.loading = true;
    this.authService.login(this.email.value, this.password.value).subscribe(
      user => {
        if (user.success) {
          this.loading = false;
          this.router.navigate(["/user-detailes"]);
        } else {
          this.loading = false;
          this.alertService.error(user.error.errorDesc);
        }
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }
}
