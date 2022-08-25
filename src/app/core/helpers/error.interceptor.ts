import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,private toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
          if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload();
          }
            const error = err.error.error.message || err.statusText;
            this.toastr.error(err.error.error.message || "Some thing went wrong.", 'Error');
            return throwError(error);
        }));
    }
}
