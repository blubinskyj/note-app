import {Component, OnInit} from '@angular/core';
import {StoreService} from "../shared/services/store.service";
import {GroupsService} from "../shared/services/groups.service";
import {AllGroupsResponse, Group} from "../shared/interfaces";
import {Observable} from "rxjs";
import jwt_decode from 'jwt-decode';
import {AuthService} from "../shared/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups$?: Observable<AllGroupsResponse>
  public groupName = ""

  public form = new FormGroup({
    groupName: new FormControl(this.groupName, [
      Validators.required
    ])
  })

  constructor(private store: StoreService,
              private groupsService: GroupsService,
              private auth: AuthService) {
    this.store.store.subscribe((res) => console.log(res))
  }

  ngOnInit(): void {
    const token = this.getDecodedAccessToken(this.auth.getToken())
    this.groups$ = this.groupsService.fetch()
  }

  selectGroupHandler(id: string) {
    this.store.updateStore({selectedGroupId: id})
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}


