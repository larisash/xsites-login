import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { AlertService } from "../../services/alert.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "regestration",
  templateUrl: "./regestration.component.html",
  styleUrls: ["./regestration.component.css"]
})
export class RegestrationComponent implements OnInit {
  registerForm: FormGroup;
  submitted: Boolean = false;
  loading: Boolean = false;
  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}
  @Output() goToLogin = new EventEmitter();

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", Validators.required],
      telephone: ["", Validators.required],
      telephonePrefix: ["", Validators.required],
      countryIso: ["", Validators.required]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onRegestore() {
    if (this.registerForm.invalid) {
      return;
    }
    this.submitted = true;
    this.loading = true;
    this.userService.register(this.registerForm.value).subscribe(
      data => {
        this.changeToLogin();
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }

  changeToLogin() {
    this.goToLogin.emit("false");
  }
  changeToTermsOfService() {
    this.router.navigate([]).then(result => {
      window.open("https://www.termsandconditionsgenerator.com/", "_blank");
    });
  }
}
