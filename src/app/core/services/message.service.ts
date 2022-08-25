import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastr: ToastrService, private _translate: TranslateService) { }

  showError(title: string, message: string) {
    this._translate.get([message, title]).
      subscribe((res: any) => {
        this.toastr.error(Object.values(res)[0].toString(), Object.values(res)[1].toString());
      },
      )
  }

  showServerSideError() {
    this._translate.get(["Messages.ServerError", "Common.Title.Error"]).
      subscribe((res: any) => {
        this.toastr.error(Object.values(res)[0].toString(), Object.values(res)[1].toString());
      },
      )
  }


  showSuccess(title: string, message: string) {
    this._translate.get([message, title]).
      subscribe((res: any) => {
        this.toastr.success(Object.values(res)[0].toString(), Object.values(res)[1].toString());
      },
      )
  }

  showInfo(title: string, message: string) {
    this._translate.get([message, title]).
      subscribe((res: any) => {
        this.toastr.info(Object.values(res)[0].toString(), Object.values(res)[1].toString());
      },
      )
  }




}
