import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {StoreService} from "../../services/store.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {

  constructor(private auth: AuthService,
              private store: StoreService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(event: Event) {
    event.preventDefault()
    this.store.logout()
    this.auth.logout()
    this.router.navigate(['/login'])

  }
}
