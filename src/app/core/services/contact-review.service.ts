import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactReviewService {

  constructor(private http: HttpClient, private _router: Router) { }


  //#region Get


  getAll(filter: string | null | undefined, maxTransparencyFilter: number | null | undefined, minTransparencyFilter: number | null | undefined, maxCommunicationFilter: number | null | undefined, minCommunicationFilter: number | null | undefined, maxProfessionalismFilter: number | null | undefined, minProfessionalismFilter: number | null | undefined, maxRecommendedFilter: number | null | undefined, minRecommendedFilter: number | null | undefined, maxAverageRatingFilter: number | null | undefined, minAverageRatingFilter: number | null | undefined, commentsFilter: string | null | undefined, contactInvoiceHeaderInvoiceCodeFilter: string | null | undefined, paymentPlanDetailTransactionIDFilter: string | null | undefined, contactFirstnameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
    let url_ = environment.apiURL + "/api/services/app/ContactReviews/GetAll?";
    if (filter !== undefined && filter !== null)
      url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
    if (maxTransparencyFilter !== undefined && maxTransparencyFilter !== null)
      url_ += "MaxTransparencyFilter=" + encodeURIComponent("" + maxTransparencyFilter) + "&";
    if (minTransparencyFilter !== undefined && minTransparencyFilter !== null)
      url_ += "MinTransparencyFilter=" + encodeURIComponent("" + minTransparencyFilter) + "&";
    if (maxCommunicationFilter !== undefined && maxCommunicationFilter !== null)
      url_ += "MaxCommunicationFilter=" + encodeURIComponent("" + maxCommunicationFilter) + "&";
    if (minCommunicationFilter !== undefined && minCommunicationFilter !== null)
      url_ += "MinCommunicationFilter=" + encodeURIComponent("" + minCommunicationFilter) + "&";
    if (maxProfessionalismFilter !== undefined && maxProfessionalismFilter !== null)
      url_ += "MaxProfessionalismFilter=" + encodeURIComponent("" + maxProfessionalismFilter) + "&";
    if (minProfessionalismFilter !== undefined && minProfessionalismFilter !== null)
      url_ += "MinProfessionalismFilter=" + encodeURIComponent("" + minProfessionalismFilter) + "&";
    if (maxRecommendedFilter !== undefined && maxRecommendedFilter !== null)
      url_ += "MaxRecommendedFilter=" + encodeURIComponent("" + maxRecommendedFilter) + "&";
    if (minRecommendedFilter !== undefined && minRecommendedFilter !== null)
      url_ += "MinRecommendedFilter=" + encodeURIComponent("" + minRecommendedFilter) + "&";
    if (maxAverageRatingFilter !== undefined && maxAverageRatingFilter !== null)
      url_ += "MaxAverageRatingFilter=" + encodeURIComponent("" + maxAverageRatingFilter) + "&";
    if (minAverageRatingFilter !== undefined && minAverageRatingFilter !== null)
      url_ += "MinAverageRatingFilter=" + encodeURIComponent("" + minAverageRatingFilter) + "&";
    if (commentsFilter !== undefined && commentsFilter !== null)
      url_ += "CommentsFilter=" + encodeURIComponent("" + commentsFilter) + "&";
    if (contactInvoiceHeaderInvoiceCodeFilter !== undefined && contactInvoiceHeaderInvoiceCodeFilter !== null)
      url_ += "ContactInvoiceHeaderInvoiceCodeFilter=" + encodeURIComponent("" + contactInvoiceHeaderInvoiceCodeFilter) + "&";
    if (paymentPlanDetailTransactionIDFilter !== undefined && paymentPlanDetailTransactionIDFilter !== null)
      url_ += "PaymentPlanDetailTransactionIDFilter=" + encodeURIComponent("" + paymentPlanDetailTransactionIDFilter) + "&";
    if (contactFirstnameFilter !== undefined && contactFirstnameFilter !== null)
      url_ += "ContactFirstnameFilter=" + encodeURIComponent("" + contactFirstnameFilter) + "&";
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

}













