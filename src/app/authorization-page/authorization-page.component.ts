import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {StoreService} from "../shared/services/store.service";
import {Observable, Subscription} from "rxjs";
import {StoreData} from "../shared/interfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.scss']
})
export class AuthorizationPageComponent implements OnInit, OnDestroy {
  public email = ""
  public password = ""
  public aSub = new Subscription()

  public form = new FormGroup({
    email: new FormControl(this.store.store.value.email, [
      // Validators.required,
      // Validators.email
    ]),
    password: new FormControl(this.password, [
      Validators.required
    ])
  })


  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private store: StoreService) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {

      } else if (params['accessDenied']) {

      }
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }


  onSubmit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return;
    }
    this.aSub = this.auth.authorize(this.form.value).subscribe(
      (res) => {
        if (!res.error) {
          if (!res.data.token) {
            alert("email or password was not found")
            return;
          }
          this.store.updateStore({email: this.form.value.email, password: this.form.value.password})
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
