import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditionService {

  constructor(private _http: HttpClient) { }
  getEditionComboboxItems(selectedEditionId: number | null | undefined, addAllItem: boolean | undefined, onlyFreeItems: boolean | undefined): any{
    let url_ = environment.apiURL + "/api/services/app/Edition/GetEditionComboboxItems?";
    if (selectedEditionId !== undefined && selectedEditionId !== null)
      url_ += "selectedEditionId=" + encodeURIComponent("" + selectedEditionId) + "&";
    if (addAllItem === null)
      throw new Error("The parameter 'addAllItem' cannot be null.");
    else if (addAllItem !== undefined)
      url_ += "addAllItem=" + encodeURIComponent("" + addAllItem) + "&";
    if (onlyFreeItems === null)
      throw new Error("The parameter 'onlyFreeItems' cannot be null.");
    else if (onlyFreeItems !== undefined)
      url_ += "onlyFreeItems=" + encodeURIComponent("" + onlyFreeItems) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this._http.get<any>(url_).toPromise();
  }
 

}
export class ComboboxItemDto {
  value: string | undefined;
  displayText: string | undefined;
  isSelected: boolean;
}