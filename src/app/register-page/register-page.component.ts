import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {StoreService} from "../shared/services/store.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  public firstName = ""
  public lastName = ""
  public email = ""
  public password = ""

  public form = new FormGroup({
    firstName: new FormControl(this.firstName, [
      Validators.required
    ]),
    lastName: new FormControl(this.lastName, [
      Validators.required
    ]),
    email: new FormControl(this.store.store.value.email, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(this.password, [
      Validators.required
    ])
  })

  constructor(private auth: AuthService,
              private router: Router,
              private store: StoreService) {
  }

  onSubmit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return;
    }
    this.auth.register(this.form.value).subscribe(
      (res) => {
        if (!res.error) {
          if (!res.data.user) {
            alert(" was not found")
            return;
          }
          this.store.updateStore({
            firstName: this.form.value.firstName,
            lastName: this.form.value.lastName,
            email: this.form.value.email,
            password: this.form.value.password
          })
          return this.router.navigate(['/overview'])
        }
        throw new Error("Internal server error")
      },
      error => {
        console.warn(error)
      }
    )
  }
}

