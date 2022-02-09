import {Component, OnInit} from '@angular/core';
import {StoreService} from "../shared/services/store.service";
import {GroupsService} from "../shared/services/groups.service";
import {AuthService} from "../shared/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-note-content',
  templateUrl: './note-content.component.html',
  styleUrls: ['./note-content.component.scss']
})
export class NoteContentComponent implements OnInit {

  public content = ""
  public createdAt = Date.now()
  public userId = ""

  public form = new FormGroup({
    content: new FormControl(this.content, [
      Validators.required
    ]),
    createdAt: new FormControl(this.createdAt, [
      Validators.required
    ]),
    userId: new FormControl(this.userId, [
      Validators.required,
    ])
  })

  constructor(private store: StoreService,
              private groupsService: GroupsService,
              private auth: AuthService) {
  }

  ngOnInit(): void {

  }

  onSubmit(){

  }

}
