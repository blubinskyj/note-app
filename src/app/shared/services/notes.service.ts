import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DeleteGroupResponse, DeleteNote, DeleteNoteResponse, Note, NoteResponse} from "../interfaces";
import {Observable} from "rxjs";


@Injectable()
export class NotesService {
  constructor(private http: HttpClient) {
  }

  register(note: Note): Observable<NoteResponse> {
    return this.http.post<NoteResponse>(`/api/${note.userId}/${note._id}`, note)
  }

  deleteNote(deleteNote: DeleteNote): Observable<DeleteNoteResponse>{
    return this.http.delete<DeleteNoteResponse>(`/api/notes/${deleteNote.groupId}/${deleteNote.id}`)
  }

}
