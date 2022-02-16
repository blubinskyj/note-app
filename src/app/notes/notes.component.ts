import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoreService} from "../shared/services/store.service";
import {GroupsService} from "../shared/services/groups.service";
import {BehaviorSubject,Subscription} from "rxjs";
import {Note} from "../shared/interfaces";
import {NotesService} from "../shared/services/notes.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {

  notes$: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([])
  private storeSub?: Subscription

  constructor(private store: StoreService,
              private groupsService: GroupsService,
              private notesService: NotesService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.storeSub = this.store.store.subscribe((storeData) => {
      const targetGroup = storeData.groups.find((group) => {
        return group._id === storeData.selectedGroupId
      })
      if (targetGroup) {
        this.notes$.next(targetGroup.notes)
      } else {
        this.notes$.next([])
      }
    })
  }

  ngOnDestroy() {
    this.storeSub?.unsubscribe()
  }


  deleteNote(id: string) {
    if (this.store.store.value.selectedNoteId == id) {
      this.store.updateStore({selectedNoteId: ""})
      console.log(this.store.store.value.selectedNoteId)
    }
    this.notesService.deleteNote(this.store.store.value.selectedGroupId, id).subscribe(() => {
      this.toastr.success("Note was deleted")
    })
  }

  selectNoteHandler(id: string) {
    this.store.updateStore({selectedNoteId: id})
  }
}
