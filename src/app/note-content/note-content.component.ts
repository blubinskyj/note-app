import {Component, OnInit} from '@angular/core';
import {StoreService} from "../shared/services/store.service";
import {GroupsService} from "../shared/services/groups.service";
import {AuthService} from "../shared/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {Group, Note} from "../shared/interfaces";
import {NotesService} from "../shared/services/notes.service";
import {ToastrService} from "ngx-toastr";

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
  groups$: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([])
  note$: BehaviorSubject<Note> = new BehaviorSubject<Note>(this.initialNote)
  public content = ""
  public createdAt = Date.now()
  public groupId = ""

  public form = new FormGroup({
    content: new FormControl(this.content, [
      Validators.required
    ]),
    createdAt: new FormControl(this.createdAt, [
      Validators.required
    ]),
    groupId: new FormControl(this.groupId, [
      Validators.required,
    ])
  })

  constructor(private store: StoreService,
              private groupsService: GroupsService,
              private notesService: NotesService,
              private toastr: ToastrService) {
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
        }else {
          this.note$.next(this.initialNote)
        }
      }
    })
  }

  // updateNote(){
  //
  // }

  onSubmit() {

    this.notesService.createNote(this.store.store.value.selectedGroupId,this.form.value.content).subscribe(()=>{
      this.groupsService.fetch()
      this.toastr.success("Note was created")
    })
  }

  fetchGroups() {
    this.groupsService.fetch().subscribe((res) => {
      this.groups$.next(res.data.groups)
      this.store.updateStore({groups: res.data.groups})
    })
  }

}
