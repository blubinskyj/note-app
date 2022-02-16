import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoreService} from "../shared/services/store.service";
import {GroupsService} from "../shared/services/groups.service";
import {AuthService} from "../shared/services/auth.service";
import {BehaviorSubject, Observable, of, Subscription} from "rxjs";
import {AllGroupsResponse, AllNotesResponse, Group, Note} from "../shared/interfaces";
import {GroupsComponent} from "../groups/groups.component";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {

  groups$: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([])
  notes$: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([])
  private storeSub?: Subscription

  constructor(private store: StoreService,
              private groupsService: GroupsService,
              private auth: AuthService) {
  }

  ngOnInit(): void {
    this.storeSub = this.store.store.subscribe((storeData) => {
      const targetGroup = storeData.groups.find((group) => {
        return group._id === storeData.selectedGroupId
      })
      if (targetGroup) {
        this.notes$.next(targetGroup.notes)
      }else {
        this.notes$.next([])
      }
    })
  }

  ngOnDestroy() {
    this.storeSub?.unsubscribe()
  }


  selectNoteHandler(id: string) {
    this.store.updateStore({selectedNoteId: id})

  }
}
