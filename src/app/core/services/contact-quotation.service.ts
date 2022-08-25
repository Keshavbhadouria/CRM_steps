import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateOrEditLawfirmFeeTypeDto } from '../models/Lawfirm/LawfirmFeeType';

@Injectable({
    providedIn: 'root'
})
export class ContactQuotationService {

    constructor(private http: HttpClient, private _router: Router) { }

    GetAllByFilters(filter: string | null | undefined, contactId: number | null | undefined, maxExpirationDateFilter: moment.Moment | null | undefined, minExpirationDateFilter: moment.Moment | null | undefined, maxSubTotalFilter: number | null | undefined, minSubTotalFilter: number | null | undefined, maxTaxFilter: number | null | undefined, minTaxFilter: number | null | undefined, minTotalFilter: number | null | undefined, maxTotalFilter: number | null | undefined, commentsFilter: string | null | undefined, contactCompanyFilter: string | null | undefined, userNameFilter: string | null | undefined, statusFilter: string | null | undefined, quoteNoFilter: number | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
        let url_ = environment.apiURL + "/api/services/app/ContactQuoteHeaders/GetAllByFilters?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (contactId !== undefined && filter !== null)
            url_ += "ContactId=" + encodeURIComponent("" + contactId) + "&";
        if (maxExpirationDateFilter !== undefined && maxExpirationDateFilter !== null)
            url_ += "MaxExpirationDateFilter=" + encodeURIComponent(maxExpirationDateFilter ? "" + maxExpirationDateFilter.toJSON() : "") + "&";
        if (minExpirationDateFilter !== undefined && minExpirationDateFilter !== null)
            url_ += "MinExpirationDateFilter=" + encodeURIComponent(minExpirationDateFilter ? "" + minExpirationDateFilter.toJSON() : "") + "&";
        if (maxSubTotalFilter !== undefined && maxSubTotalFilter !== null)
            url_ += "MaxSubTotalFilter=" + encodeURIComponent("" + maxSubTotalFilter) + "&";
        if (minSubTotalFilter !== undefined && minSubTotalFilter !== null)
            url_ += "MinSubTotalFilter=" + encodeURIComponent("" + minSubTotalFilter) + "&";
        if (maxTaxFilter !== undefined && maxTaxFilter !== null)
            url_ += "MaxTaxFilter=" + encodeURIComponent("" + maxTaxFilter) + "&";
        if (minTaxFilter !== undefined && minTaxFilter !== null)
            url_ += "MinTaxFilter=" + encodeURIComponent("" + minTaxFilter) + "&";
        if (minTotalFilter !== undefined && minTotalFilter !== null)
            url_ += "MinTotalFilter=" + encodeURIComponent("" + minTotalFilter) + "&";
        if (maxTotalFilter !== undefined && maxTotalFilter !== null)
            url_ += "MaxTotalFilter=" + encodeURIComponent("" + maxTotalFilter) + "&";
        if (commentsFilter !== undefined && commentsFilter !== null)
            url_ += "CommentsFilter=" + encodeURIComponent("" + commentsFilter) + "&";
        if (contactCompanyFilter !== undefined && contactCompanyFilter !== null)
            url_ += "ContactCompanyFilter=" + encodeURIComponent("" + contactCompanyFilter) + "&";
        if (userNameFilter !== undefined && userNameFilter !== null)
            url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
        if (statusFilter !== undefined && statusFilter !== null)
            url_ += "StatusFilter=" + encodeURIComponent("" + statusFilter) + "&";
        if (quoteNoFilter !== undefined && quoteNoFilter !== null)
            url_ += "QuoteNoFilter=" + encodeURIComponent("" + quoteNoFilter) + "&";
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

    getAllByContactQuoteHeaderId(contactQuoteHeaderId: string | null | undefined) {
        let url_ = environment.apiURL + "/api/services/app/ContactQuoteDetails/GetAllByContactQuoteHeaderId?";
        if (contactQuoteHeaderId !== undefined && contactQuoteHeaderId !== null)
            url_ += "ContactQuoteHeaderId=" + encodeURIComponent("" + contactQuoteHeaderId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.get<any>(url_).toPromise();
    }

    createOrEdit(body: CreateOrEditContactQuoteHeaderDto | undefined) {
        let url_ = environment.apiURL + "/api/services/app/ContactQuoteHeaders/CreateOrEdit";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        return this.http.post<any>(url_, body).toPromise();
    }

    getContactQuoteHeaderForEdit(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/ContactQuoteHeaders/GetContactQuoteHeaderForEdit?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.get<any>(url_).toPromise();
    }

    delete(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/ContactQuoteHeaders/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.delete(url_).toPromise();
    }

    //dropdowns
    getAllContactForTableDropdown(): any {
        let url_ = environment.apiURL + "/api/services/app/ContactQuoteHeaders/GetAllContactForTableDropdown"

        return this.http.get<any>(url_).toPromise();
    }
    getAllUserForTableDropdown(): any {
        let url_ = environment.apiURL + "/api/services/app/ContactQuoteHeaders/GetAllUserForTableDropdown"

        return this.http.get<any>(url_).toPromise();
    }
}
export class CreateOrEditContactQuoteHeaderDto {
    expirationDate!: Date;
    subTotal!: number;
    tax!: number;
    total!: number;
    comments!: string | undefined;
    contactId!: number | undefined;
    userId!: number | undefined;
    contactDetail!: CreateOrEditContactQuoteDetailDto[] | undefined;
    id!: string | undefined;
}
export class CreateOrEditContactQuoteDetailDto {
    price!: number;
    discount!: number;
    tax!: number;
    total!: number;
    quantity!: number;
    contactQuoteHeaderId!: string | undefined;
    lawfirmServiceId!: number | undefined;
    id!: string | undefined;
}