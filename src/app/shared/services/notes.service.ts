import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
  CreateGroup,
  CreateGroupResponse,
  CreateNoteResponse,
  DeleteNote,
  DeleteNoteResponse,
  UpdateNoteResponse
} from "../interfaces";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) {
  }

  deleteNote(groupId: string, id: string): Observable<DeleteNoteResponse> {
    return this.http.delete<DeleteNoteResponse>(`/api/notes/${groupId}/${id}`)
  }

  createNote(groupId:string,content:string): Observable<CreateNoteResponse>{
    return this.http.post<CreateNoteResponse>(`/api/notes/${groupId}`,content)
  }

  updateNote(groupId:string,noteId:string,content:string): Observable<UpdateNoteResponse>{
    return this.http.put<UpdateNoteResponse>(`/api/notes/${groupId}/${noteId}`,content)
  }

}
