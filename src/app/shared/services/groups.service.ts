import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AllGroupsResponse} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<AllGroupsResponse> {
    return this.http.get<AllGroupsResponse>('api/groups')
  }
}
