import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Note, NoteResponse} from "../interfaces";
import {Observable} from "rxjs";


@Injectable()
export class NotesService {
  constructor(private http: HttpClient) {
  }

  register(note: Note): Observable<NoteResponse> {
    return this.http.post<NoteResponse>('/api/:groupId', note)
  }

}
