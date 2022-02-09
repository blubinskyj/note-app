import {Component, OnInit} from '@angular/core';
import {StoreService} from "../shared/services/store.service";
import {GroupsService} from "../shared/services/groups.service";
import {AuthService} from "../shared/services/auth.service";
import {Observable} from "rxjs";
import {AllGroupsResponse} from "../shared/interfaces";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  groups$?: Observable<AllGroupsResponse>
  selectedGroup = ""


  constructor(private store: StoreService,
              private groupsService: GroupsService,
              private auth: AuthService) {
  }

  ngOnInit(): void {
    this.groups$ = this.groupsService.fetch()
  }

  selectNoteHandler(id: string){
    this.store.updateStore({selectedNoteId: id})
  }

}
