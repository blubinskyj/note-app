import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, map, tap} from 'rxjs/operators';
import {StoreService} from "../services/store.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService,
              private store: StoreService,
              private router: Router,
              private toastr: ToastrService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.auth.getToken()
        }
      })
    }


    return next.handle(req).pipe(tap(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 403) {
            return;
          }
          this.auth.logout()
          this.store.logout()
          this.toastr.warning("Session is over. Pleas login")
          this.router.navigate(['login']);
        }


        // return next.handle(req).pipe( catchError((err: any, dcfv) => {
        //   if (err instanceof HttpErrorResponse) {
        //     if (err.status !== 401) {
        //       return;
        //     }
        //     this.router.navigate(['login']);
        //   }

        // return next.handle(req).pipe(catchError(event => {
        //   console.log(event)
        //   if (event instanceof HttpErrorResponse) {
        //     if (event.status === 403){
        //       this.router.navigate(['/login'])
        //       return of(null)
        //     }
        //   }
        //   return event;
        // }))
      }))
  }
}

// next.handle(clonedRequest).pipe(map(event => { ... }))
// intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//   return next.handle(req).map(event => {
//     if (event instanceof HttpResponse && shouldBeIntercepted(event)) {
//       event = event.clone({ body: resolveReferences(event.body) })
//     }
//     return event;
//   });
// }
