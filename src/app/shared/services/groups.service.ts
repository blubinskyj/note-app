import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  AllGroupsResponse,
  CreateGroup,
  CreateGroupResponse,
  DeleteGroupResponse, UpdateGroup,
  UpdateGroupResponse
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

  deleteGroup(id: string): Observable<DeleteGroupResponse>{
    return this.http.delete<DeleteGroupResponse>(`/api/groups/${id}`)
  }

  updateGroup(updateGroup: UpdateGroup): Observable<UpdateGroupResponse>{
    return this.http.put<UpdateGroupResponse>(`/api/groups/${updateGroup.id}`,updateGroup)
  }
}
