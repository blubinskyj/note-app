import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoreService} from "../shared/services/store.service";
import {GroupsService} from "../shared/services/groups.service";
import {Group,} from "../shared/interfaces";
import {BehaviorSubject, Subscription} from "rxjs";
import jwt_decode from 'jwt-decode';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {


  groups$: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([])
  private storeSub?: Subscription
  public name = ""
  isShow = true
  isEditing = false

  public form = new FormGroup({
    name: new FormControl(this.name, [
      Validators.required
    ])
  })

  constructor(private store: StoreService,
              private groupsService: GroupsService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.fetchGroups()
    this.storeSub = this.store.store.subscribe((res) => console.log(res))
  }

  ngOnDestroy() {
    this.storeSub?.unsubscribe()
  }

  deleteGroup(id: string) {
    if (this.store.store.value.selectedGroupId === id) {
      this.store.updateStore({selectedGroupId: ""})
      console.log(this.store.store.value.selectedGroupId)
    }
    this.groupsService.deleteGroup(id).subscribe(() => {
      this.fetchGroups()
    })
  }

  onSubmit() {
    this.groupsService.createGroup(this.form.value).subscribe(
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

  selectGroupHandler(id: string) {
    this.store.updateStore({selectedGroupId: id})
  }

  fetchGroups() {
    this.groupsService.fetch().subscribe((res) => {
      this.groups$.next(res.data.groups)
      this.store.updateStore({groups: res.data.groups})
    })
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


