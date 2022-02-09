import {Injectable} from "@angular/core";
import {Email, FullUser, User, LoginResponse, AuthResponse, RegisterResponse} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = ''

  constructor(private http: HttpClient) {
  }


  authorize(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/user/auth', user)
      .pipe(
        tap(
          ({data})=>{
            localStorage.setItem('auth-token', data.token)
            this.setToken(data.token)
          }
        )
      )
  }
  setToken(token: string){
    this.token = token
  }

  getToken(): string{
    return this.token
  }

  isAuthenticated(): boolean{
    return !!this.token
  }

  logout(){
    this.setToken('')
    localStorage.clear()
  }

  login(email: Email): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/user/login', email)
  }

  register(fullUser: FullUser): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('/api/user/register', fullUser)
  }
}

