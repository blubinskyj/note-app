import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  AllGroupsResponse,
  CreateGroup,
  CreateGroupResponse,
} from "../interfaces";
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

  createGroup(createUser: CreateGroup): Observable<CreateGroupResponse> {
    return this.http.post<CreateGroupResponse>('/api/groups',createUser)
  }

  // deleteGroup(id: Id): Observable<DeleteGroup>{
  //   this.http.delete<DeleteGroup>(`/api/groups/${id}`)
  // }
}
