import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AllGroupsResponse} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }

  getGroups(){
    return this.http.get<AllGroupsResponse>('api/groups')
  }
}
