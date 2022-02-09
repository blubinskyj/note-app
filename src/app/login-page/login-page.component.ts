import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {StoreService} from "../shared/services/store.service";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  public email = ""

  public form: FormGroup = new FormGroup({
    email: new FormControl(this.email, [
      Validators.required,
      Validators.email
    ])
  })

  constructor(private auth: AuthService,
              private router: Router,
              private store: StoreService,
              private toastr: ToastrService) {
  }


  onSubmit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return;
    }
    this.auth.login(this.form.value).subscribe(
      (res) => {
        console.log("login res ", res)
        if (!res.error) {
          if (!res.data.emailExists) {
            this.toastr.error("email was not found")
            this.store.updateStore({email: this.form.value.email})
            return this.router.navigate(['/register']);
          }
          this.store.updateStore({email: this.form.value.email})
          console.log("wdedw",this.store.store.value)
          return this.router.navigate(['/auth'])
        }
        throw new Error("Internal server error")

      },
      error => {
        console.warn(error)
      }
    )
  }
}
