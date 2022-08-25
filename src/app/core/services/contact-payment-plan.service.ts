import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ContactPaymentPlanService {

    constructor(private http: HttpClient, private _router: Router) { }


    //#region Get


    getAll(filter: string | null | undefined, maxBalanceFilter: number | null | undefined, minBalanceFilter: number | null | undefined, maxDownpaymentFilter: number | null | undefined, minDownpaymentFilter: number | null | undefined, maxPaymentsFilter: number | null | undefined, minPaymentsFilter: number | null | undefined, maxPaymentsAmountFilter: number | null | undefined, minPaymentsAmountFilter: number | null | undefined, maxFirstQuotaDateFilter: Date | null | undefined, minFirstQuotaDateFilter: Date | null | undefined, paymentPlanNumberFilter: string | null | undefined, paymentPlanQRCodeFilter: string | null | undefined, contactInvoiceHeaderGatewayFilter: string | null | undefined, contactCompanyFilter: string | null | undefined, userNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
        let url_ = environment.apiURL + "/api/services/app/PaymentPlanHeaders/GetAll?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (maxBalanceFilter !== undefined && maxBalanceFilter !== null)
            url_ += "MaxBalanceFilter=" + encodeURIComponent("" + maxBalanceFilter) + "&";
        if (minBalanceFilter !== undefined && minBalanceFilter !== null)
            url_ += "MinBalanceFilter=" + encodeURIComponent("" + minBalanceFilter) + "&";
        if (maxDownpaymentFilter !== undefined && maxDownpaymentFilter !== null)
            url_ += "MaxDownpaymentFilter=" + encodeURIComponent("" + maxDownpaymentFilter) + "&";
        if (minDownpaymentFilter !== undefined && minDownpaymentFilter !== null)
            url_ += "MinDownpaymentFilter=" + encodeURIComponent("" + minDownpaymentFilter) + "&";
        if (maxPaymentsFilter !== undefined && maxPaymentsFilter !== null)
            url_ += "MaxPaymentsFilter=" + encodeURIComponent("" + maxPaymentsFilter) + "&";
        if (minPaymentsFilter !== undefined && minPaymentsFilter !== null)
            url_ += "MinPaymentsFilter=" + encodeURIComponent("" + minPaymentsFilter) + "&";
        if (maxPaymentsAmountFilter !== undefined && maxPaymentsAmountFilter !== null)
            url_ += "MaxPaymentsAmountFilter=" + encodeURIComponent("" + maxPaymentsAmountFilter) + "&";
        if (minPaymentsAmountFilter !== undefined && minPaymentsAmountFilter !== null)
            url_ += "MinPaymentsAmountFilter=" + encodeURIComponent("" + minPaymentsAmountFilter) + "&";
        if (maxFirstQuotaDateFilter !== undefined && maxFirstQuotaDateFilter !== null)
            url_ += "MaxFirstQuotaDateFilter=" + encodeURIComponent(maxFirstQuotaDateFilter ? "" + maxFirstQuotaDateFilter.toJSON() : "") + "&";
        if (minFirstQuotaDateFilter !== undefined && minFirstQuotaDateFilter !== null)
            url_ += "MinFirstQuotaDateFilter=" + encodeURIComponent(minFirstQuotaDateFilter ? "" + minFirstQuotaDateFilter.toJSON() : "") + "&";
        if (paymentPlanNumberFilter !== undefined && paymentPlanNumberFilter !== null)
            url_ += "PaymentPlanNumberFilter=" + encodeURIComponent("" + paymentPlanNumberFilter) + "&";
        if (paymentPlanQRCodeFilter !== undefined && paymentPlanQRCodeFilter !== null)
            url_ += "PaymentPlanQRCodeFilter=" + encodeURIComponent("" + paymentPlanQRCodeFilter) + "&";
        if (contactInvoiceHeaderGatewayFilter !== undefined && contactInvoiceHeaderGatewayFilter !== null)
            url_ += "ContactInvoiceHeaderGatewayFilter=" + encodeURIComponent("" + contactInvoiceHeaderGatewayFilter) + "&";
        if (contactCompanyFilter !== undefined && contactCompanyFilter !== null)
            url_ += "ContactCompanyFilter=" + encodeURIComponent("" + contactCompanyFilter) + "&";
        if (userNameFilter !== undefined && userNameFilter !== null)
            url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
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

    getAllByFilters(filter: string | null | undefined, contactId: number | null | undefined, maxBalanceFilter: number | null | undefined, minBalanceFilter: number | null | undefined, maxDownpaymentFilter: number | null | undefined, minDownpaymentFilter: number | null | undefined, maxPaymentsFilter: number | null | undefined, minPaymentsFilter: number | null | undefined, maxPaymentsAmountFilter: number | null | undefined, minPaymentsAmountFilter: number | null | undefined, maxFirstQuotaDateFilter: Date | null | undefined, minFirstQuotaDateFilter: Date | null | undefined, paymentPlanNumberFilter: string | null | undefined, paymentPlanQRCodeFilter: string | null | undefined, contactInvoiceHeaderGatewayFilter: string | null | undefined, contactCompanyFilter: string | null | undefined, userNameFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
        let url_ = environment.apiURL + "/api/services/app/PaymentPlanHeaders/GetAllByFilters?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (contactId !== undefined && contactId !== null)
            url_ += "ContactId=" + encodeURIComponent("" + contactId) + "&";
        if (maxBalanceFilter !== undefined && maxBalanceFilter !== null)
            url_ += "MaxBalanceFilter=" + encodeURIComponent("" + maxBalanceFilter) + "&";
        if (minBalanceFilter !== undefined && minBalanceFilter !== null)
            url_ += "MinBalanceFilter=" + encodeURIComponent("" + minBalanceFilter) + "&";
        if (maxDownpaymentFilter !== undefined && maxDownpaymentFilter !== null)
            url_ += "MaxDownpaymentFilter=" + encodeURIComponent("" + maxDownpaymentFilter) + "&";
        if (minDownpaymentFilter !== undefined && minDownpaymentFilter !== null)
            url_ += "MinDownpaymentFilter=" + encodeURIComponent("" + minDownpaymentFilter) + "&";
        if (maxPaymentsFilter !== undefined && maxPaymentsFilter !== null)
            url_ += "MaxPaymentsFilter=" + encodeURIComponent("" + maxPaymentsFilter) + "&";
        if (minPaymentsFilter !== undefined && minPaymentsFilter !== null)
            url_ += "MinPaymentsFilter=" + encodeURIComponent("" + minPaymentsFilter) + "&";
        if (maxPaymentsAmountFilter !== undefined && maxPaymentsAmountFilter !== null)
            url_ += "MaxPaymentsAmountFilter=" + encodeURIComponent("" + maxPaymentsAmountFilter) + "&";
        if (minPaymentsAmountFilter !== undefined && minPaymentsAmountFilter !== null)
            url_ += "MinPaymentsAmountFilter=" + encodeURIComponent("" + minPaymentsAmountFilter) + "&";
        if (maxFirstQuotaDateFilter !== undefined && maxFirstQuotaDateFilter !== null)
            url_ += "MaxFirstQuotaDateFilter=" + encodeURIComponent(maxFirstQuotaDateFilter ? "" + maxFirstQuotaDateFilter: "") + "&";
        if (minFirstQuotaDateFilter !== undefined && minFirstQuotaDateFilter !== null)
            url_ += "MinFirstQuotaDateFilter=" + encodeURIComponent(minFirstQuotaDateFilter ? "" + minFirstQuotaDateFilter : "") + "&";
        if (paymentPlanNumberFilter !== undefined && paymentPlanNumberFilter !== null)
            url_ += "PaymentPlanNumberFilter=" + encodeURIComponent("" + paymentPlanNumberFilter) + "&";
        if (paymentPlanQRCodeFilter !== undefined && paymentPlanQRCodeFilter !== null)
            url_ += "PaymentPlanQRCodeFilter=" + encodeURIComponent("" + paymentPlanQRCodeFilter) + "&";
        if (contactInvoiceHeaderGatewayFilter !== undefined && contactInvoiceHeaderGatewayFilter !== null)
            url_ += "ContactInvoiceHeaderGatewayFilter=" + encodeURIComponent("" + contactInvoiceHeaderGatewayFilter) + "&";
        if (contactCompanyFilter !== undefined && contactCompanyFilter !== null)
            url_ += "ContactCompanyFilter=" + encodeURIComponent("" + contactCompanyFilter) + "&";
        if (userNameFilter !== undefined && userNameFilter !== null)
            url_ += "UserNameFilter=" + encodeURIComponent("" + userNameFilter) + "&";
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

    getAllByPaymentPlanHeaderId(PaymentPlanHeaderId: string | null | undefined) {
        let url_ = environment.apiURL + "/api/services/app/PaymentPlanDetails/GetAllByPaymentPlanHeaderId?";
        if (PaymentPlanHeaderId !== undefined && PaymentPlanHeaderId !== null)
            url_ += "paymentPlanHeaderId=" + encodeURIComponent("" + PaymentPlanHeaderId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.get<any>(url_).toPromise();
    }

    createOrEdit(body: CreateOrEditPaymentPlanHeaderDto | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PaymentPlanHeaders/CreateOrEdit";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        return this.http.post<any>(url_, body).toPromise();
    }

    getPaymentPlanHeaderForEdit(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PaymentPlanHeaders/GetPaymentPlanHeaderForEdit?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.get<any>(url_).toPromise();
    }

    delete(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/PaymentPlanHeaders/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.delete(url_).toPromise();
    }
    //dropdowns
    getAllContactInvoiceHeaderForTableDropdown(): any {
        let url_ = environment.apiURL + "/api/services/app/PaymentPlanHeaders/GetAllContactInvoiceHeaderForTableDropdown"

        return this.http.get<any>(url_).toPromise();
    }
    getAllContactForTableDropdown(): any {
        let url_ = environment.apiURL + "/api/services/app/PaymentPlanHeaders/GetAllContactForTableDropdown"

        return this.http.get<any>(url_).toPromise();
    }
    getAllUserForTableDropdown(): any {
        let url_ = environment.apiURL + "/api/services/app/PaymentPlanHeaders/GetAllUserForTableDropdown"

        return this.http.get<any>(url_).toPromise();
    }
}

export class CreateOrEditPaymentPlanHeaderDto {
    balance!: number;
    downpayment!: number;
    payments!: number;
    paymentsAmount!: number;
    firstQuotaDate!: Date;
    paymentPlanNumber!: string | undefined;
    paymentPlanQRCode!: string | undefined;
    contactInvoiceHeaderId!: string | undefined;
    contactId!: number | undefined;
    userId!: number | undefined;
    id!: string | undefined;
}
