import { Component, OnInit } from '@angular/core';
import {StoreService} from "../shared/services/store.service";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  constructor(private store:StoreService) {
    this.store.store.subscribe((res)=>console.log(res))
  }

  ngOnInit(): void {
  }

  selectGroupHandler(id:string){
    this.store.updateStore({selectedGroupId: id})
  }
}
