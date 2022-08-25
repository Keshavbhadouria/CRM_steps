import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { CreateOrUpdateLanguageInput } from '../models/Admin/Language';
import { CreateOrEditLawfirmFeeTypeDto } from '../models/Lawfirm/LawfirmFeeType';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  public languages: string[] = ['en', 'es', 'de', 'it', 'ru'];

  constructor(public translate: TranslateService, private cookieService: CookieService , private http: HttpClient, private _router: Router) {
    let browserLang;
    this.translate.addLangs(this.languages);
    if (this.cookieService.check('lang')) {
      browserLang = this.cookieService.get('lang');
    }
    else {
      browserLang = translate.getBrowserLang();
    }
    translate.use(browserLang.match(/en|es|de|it|ru/) ? browserLang : 'en');
  }

  public setLanguage(lang) {
    this.translate.use(lang);
    this.cookieService.set('lang', lang);
  }


    //#region Get

    getLanguages() {
      let url_ = environment.apiURL + "/api/services/app/Language/GetLanguages";
      url_ = url_.replace(/[?&]$/, "");

      return this.http.get<any>(url_).toPromise();
    }

  getLanguageForEdit(id: number | null | undefined) {
    let url_ =  environment.apiURL + "/api/services/app/Language/GetLanguageForEdit?";
    if (id !== undefined && id !== null)
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }


    // getAllPMEpicStatusForTableDropdown() {
    //   let url_ = environment.apiURL + "/api/services/app/Epics/GetAllPMEpicStatusForTableDropdown";
    //   url_ = url_.replace(/[?&]$/, "");
    //   return this.http.get<any>(url_).toPromise();
    // }

    // getAllContactForLookupTable(filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    //   let url_ = environment.apiURL + "/api/services/app/PMProjects/GetAllContactForLookupTable?";
    //   if (filter !== undefined && filter !== null)
    //     url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    //   if (sorting !== undefined && sorting !== null)
    //     url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
    //   if (skipCount === null)
    //     throw new Error("The parameter 'skipCount' cannot be null.");
    //   else if (skipCount !== undefined)
    //     url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    //   if (maxResultCount === null)
    //     throw new Error("The parameter 'maxResultCount' cannot be null.");
    //   else if (maxResultCount !== undefined)
    //     url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    //   url_ = url_.replace(/[?&]$/, "");

    //   return this.http.get<any>(url_).toPromise();
    // }


  //   getAllPMProjectForLookupTable(filter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
  //     let url_ = environment.apiURL + "/api/services/app/Epics/GetAllPMProjectForLookupTable?";
  //     if (filter !== undefined && filter !== null)
  //         url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
  //     if (sorting !== undefined && sorting !== null)
  //         url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
  //     if (skipCount === null)
  //         throw new Error("The parameter 'skipCount' cannot be null.");
  //     else if (skipCount !== undefined)
  //         url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
  //     if (maxResultCount === null)
  //         throw new Error("The parameter 'maxResultCount' cannot be null.");
  //     else if (maxResultCount !== undefined)
  //         url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
  //     url_ = url_.replace(/[?&]$/, "");

  //     return this.http.get<any>(url_).toPromise();
  // }



    //#endregion

    //#region CUD

    createOrEdit(body: CreateOrUpdateLanguageInput | undefined) {
      let url_ = environment.apiURL + "/api/services/app/Language/CreateOrUpdateLanguage";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(body);
      return this.http.post<any>(url_, body).toPromise();
    }

    delete(id: number | undefined): any {
      let url_ = environment.apiURL + "/api/services/app/Language/DeleteLanguage?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

      return this.http.delete(url_).toPromise();

    }


    //#endregion




}
