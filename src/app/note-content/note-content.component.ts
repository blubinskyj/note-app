import {Component, OnInit} from '@angular/core';
import {StoreService} from "../shared/services/store.service";
import {GroupsService} from "../shared/services/groups.service";
import {AuthService} from "../shared/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {Note} from "../shared/interfaces";

@Component({
  selector: 'app-note-content',
  templateUrl: './note-content.component.html',
  styleUrls: ['./note-content.component.scss']
})
export class NoteContentComponent implements OnInit {

  public initialNote: Note = {
    content: "",
    createdAt: "",
    _id: "",
    userId: ""
  }
  note$: BehaviorSubject<Note> = new BehaviorSubject<Note>(this.initialNote)
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
    this.store.store.subscribe((storeData) => {
      const targetGroup = storeData.groups.find((group) => {
        return group._id === storeData.selectedGroupId
      })
      if (targetGroup) {
        const targetNote = targetGroup.notes.find((note) => {
          return note._id === storeData.selectedNoteId
        })
        if (targetNote) {
          this.note$.next(targetNote)
        }
      }
    })
  }
  someFunc(){

  }

  onSubmit() {
    this.content = this.store.store.value.content
    // this.userId =
    console.log(this.form.value)
  }

}
