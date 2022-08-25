import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhysicalExamService {

  constructor(private http: HttpClient) { }

  getAll(filter: string | null | undefined, fCFilter: string | null | undefined, maxPulsoFilter: number | null | undefined, minPulsoFilter: number | null | undefined, tAFilter: string | null | undefined, maxTemperaturaFilter: number | null | undefined, minTemperaturaFilter: number | null | undefined, maxTalla_PiesFilter: number | null | undefined, minTalla_PiesFilter: number | null | undefined, maxTalla_pulgadasFilter: number | null | undefined, minTalla_pulgadasFilter: number | null | undefined, maxPesoFilter: number | null | undefined, minPesoFilter: number | null | undefined, maxSCm2Filter: number | null | undefined, minSCm2Filter: number | null | undefined, palidezFilter: string | null | undefined, maxIctericiaFilter: number | null | undefined, minIctericiaFilter: number | null | undefined, peloFilter: string | null | undefined, unasFilter: string | null | undefined, comentariosFilter: string | null | undefined, contactCompanyFilter: string | null | undefined, contactId: number | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/HistoriaClinicaExamenFisicos/GetAll?";
    if (filter !== undefined && filter !== null)
        url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (fCFilter !== undefined && fCFilter !== null)
        url_ += "FCFilter=" + encodeURIComponent("" + fCFilter) + "&";
    if (maxPulsoFilter !== undefined && maxPulsoFilter !== null)
        url_ += "MaxPulsoFilter=" + encodeURIComponent("" + maxPulsoFilter) + "&";
    if (minPulsoFilter !== undefined && minPulsoFilter !== null)
        url_ += "MinPulsoFilter=" + encodeURIComponent("" + minPulsoFilter) + "&";
    if (tAFilter !== undefined && tAFilter !== null)
        url_ += "TAFilter=" + encodeURIComponent("" + tAFilter) + "&";
    if (maxTemperaturaFilter !== undefined && maxTemperaturaFilter !== null)
        url_ += "MaxTemperaturaFilter=" + encodeURIComponent("" + maxTemperaturaFilter) + "&";
    if (minTemperaturaFilter !== undefined && minTemperaturaFilter !== null)
        url_ += "MinTemperaturaFilter=" + encodeURIComponent("" + minTemperaturaFilter) + "&";
    if (maxTalla_PiesFilter !== undefined && maxTalla_PiesFilter !== null)
        url_ += "MaxTalla_PiesFilter=" + encodeURIComponent("" + maxTalla_PiesFilter) + "&";
    if (minTalla_PiesFilter !== undefined && minTalla_PiesFilter !== null)
        url_ += "MinTalla_PiesFilter=" + encodeURIComponent("" + minTalla_PiesFilter) + "&";
    if (maxTalla_pulgadasFilter !== undefined && maxTalla_pulgadasFilter !== null)
        url_ += "MaxTalla_pulgadasFilter=" + encodeURIComponent("" + maxTalla_pulgadasFilter) + "&";
    if (minTalla_pulgadasFilter !== undefined && minTalla_pulgadasFilter !== null)
        url_ += "MinTalla_pulgadasFilter=" + encodeURIComponent("" + minTalla_pulgadasFilter) + "&";
    if (maxPesoFilter !== undefined && maxPesoFilter !== null)
        url_ += "MaxPesoFilter=" + encodeURIComponent("" + maxPesoFilter) + "&";
    if (minPesoFilter !== undefined && minPesoFilter !== null)
        url_ += "MinPesoFilter=" + encodeURIComponent("" + minPesoFilter) + "&";
    if (maxSCm2Filter !== undefined && maxSCm2Filter !== null)
        url_ += "MaxSCm2Filter=" + encodeURIComponent("" + maxSCm2Filter) + "&";
    if (minSCm2Filter !== undefined && minSCm2Filter !== null)
        url_ += "MinSCm2Filter=" + encodeURIComponent("" + minSCm2Filter) + "&";
    if (palidezFilter !== undefined && palidezFilter !== null)
        url_ += "PalidezFilter=" + encodeURIComponent("" + palidezFilter) + "&";
    if (maxIctericiaFilter !== undefined && maxIctericiaFilter !== null)
        url_ += "MaxIctericiaFilter=" + encodeURIComponent("" + maxIctericiaFilter) + "&";
    if (minIctericiaFilter !== undefined && minIctericiaFilter !== null)
        url_ += "MinIctericiaFilter=" + encodeURIComponent("" + minIctericiaFilter) + "&";
    if (peloFilter !== undefined && peloFilter !== null)
        url_ += "PeloFilter=" + encodeURIComponent("" + peloFilter) + "&";
    if (unasFilter !== undefined && unasFilter !== null)
        url_ += "UnasFilter=" + encodeURIComponent("" + unasFilter) + "&";
    if (comentariosFilter !== undefined && comentariosFilter !== null)
        url_ += "ComentariosFilter=" + encodeURIComponent("" + comentariosFilter) + "&";
    if (contactCompanyFilter !== undefined && contactCompanyFilter !== null)
        url_ += "ContactCompanyFilter=" + encodeURIComponent("" + contactCompanyFilter) + "&";
    if (contactId !== undefined && contactId !== null)
        url_ += "ContactId=" + encodeURIComponent("" + contactId) + "&";
    if (sorting !== undefined && sorting !== null)
        url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
    if (skipCount === null)
        throw new Error("The parameter 'skipCount' cannot be null.");
    else if (skipCount !== undefined)
        url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null)
        throw new Error("The parameter 'maxResultCount' cannot be null.");
    else if (maxResultCount !== undefined)
        url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }

  createOrEdit(body: CreateOrEditHistoriaClinicaExamenFisicoDto | undefined):any {
    let url_ = environment.apiURL + "/api/services/app/HistoriaClinicaExamenFisicos/CreateOrEdit";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);
    return this.http.post<any>(url_, body).toPromise();
  }

  delete(id: string | undefined): any {
    let url_ = environment.apiURL + "/api/services/app/HistoriaClinicaExamenFisicos/Delete?";
    if (id === null)
        throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
        url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.delete(url_).toPromise();
  }

  //dropdowns
 
  getAllContactForTableDropdown(): any {
    let url_ = environment.apiURL + "/api/services/app/HistoriaClinicaExamenFisicos/GetAllContactForTableDropdown";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_).toPromise();
  }
}

export class CreateOrEditHistoriaClinicaExamenFisicoDto {
  fc: string | undefined;
  pulso: number;
  ta: string | undefined;
  temperatura: number;
  talla_Pies: number;
  talla_pulgadas: number;
  peso: number;
  sCm2: number;
  palidez: string | undefined;
  ictericia: number;
  pelo: string | undefined;
  unas: string | undefined;
  comentarios: string | undefined;
  contactId: number | undefined;
  id: string | undefined;
}
