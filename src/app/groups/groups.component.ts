import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StoreService} from "../shared/services/store.service";
import {GroupsService} from "../shared/services/groups.service";
import {AllGroupsResponse, Note} from "../shared/interfaces";
import {Observable} from "rxjs";
import jwt_decode from 'jwt-decode';
import {AuthService} from "../shared/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {


  groups$?: Observable<AllGroupsResponse>
  public name = "New group"
  isShow = true

  public form = new FormGroup({
    name: new FormControl(this.name, [
      Validators.required
    ])
  })

  constructor(private store: StoreService,
              private groupsService: GroupsService,
              private group: GroupsService,
              private toastr: ToastrService,
              private auth: AuthService) {
    this.store.store.subscribe((res) => console.log(res))
  }

  ngOnInit(): void {
    this.fetchGroups()
  }

  selectGroupHandler(id: string) {
    this.store.updateStore({selectedGroupId: id})
    this.groups$ = this.groupsService.fetch()
    this.groups$.forEach((group) => {
      group.data.groups.forEach((item) => {
        if (item._id == this.store.store.value.selectedGroupId) {
        }
      })
    })
  }

  onSubmit() {
    this.group.createGroup(this.form.value).subscribe(
      (res) => {
        if (!res.error) {
          this.isShow = true
          this.form.reset()
          this.fetchGroups()
          this.toastr.success("Group was create")
        }
      },
      error => {
        console.warn(error)
      }
    )
  }
  fetchGroups(){
    this.groups$ = this.groupsService.fetch()
  }

  toggleCreator() {
    this.isShow = !this.isShow;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}


