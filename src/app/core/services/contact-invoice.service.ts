import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateOrEditLawfirmFeeTypeDto } from '../models/Lawfirm/LawfirmFeeType';

@Injectable({
    providedIn: 'root'
})
export class ContactInvoiceService {

    constructor(private http: HttpClient, private _router: Router) { }

    getAll(filter: string | null | undefined, reteinerCodeFilter: string | null | undefined, maxSubTotalFilter: number | null | undefined, minSubTotalFilter: number | null | undefined, maxTaxFilter: number | null | undefined, minTaxFilter: number | null | undefined, maxTotalFilter: number | null | undefined, minTotalFilter: number | null | undefined, paidFilter: number | null | undefined, gatewayFilter: string | null | undefined, transactionIDFilter: string | null | undefined, gatewayResponseFilter: string | null | undefined, refundedFilter: number | null | undefined, maxRefundedDateFilter: moment.Moment | null | undefined, minRefundedDateFilter: moment.Moment | null | undefined, maxRefundedAmountFilter: number | null | undefined, minRefundedAmountFilter: number | null | undefined, refundedReasonFilter: string | null | undefined, refundedByFilter: string | null | undefined, voidedFilter: number | null | undefined, voidedByFilter: string | null | undefined, maxVoidedDateFilter: moment.Moment | null | undefined, minVoidedDateFilter: moment.Moment | null | undefined, quickBookTransactionIDFilter: string | null | undefined, postedQuickBookFilter: number | null | undefined, invoiceCodeFilter: string | null | undefined, contactQuoteHeaderTotalFilter: number | null | undefined, maxCreatedDateFilter: moment.Moment | null | undefined, minCreatedDateFilter: moment.Moment | null | undefined, paymentStatusFilter: number | undefined, contactNameFilter: string | null | undefined, contactEmailFilter: string | null | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
        let url_ = environment.apiURL + "/api/services/app/ContactInvoiceHeaders/GetAll?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (reteinerCodeFilter !== undefined && reteinerCodeFilter !== null)
            url_ += "ReteinerCodeFilter=" + encodeURIComponent("" + reteinerCodeFilter) + "&";
        if (maxSubTotalFilter !== undefined && maxSubTotalFilter !== null)
            url_ += "MaxSubTotalFilter=" + encodeURIComponent("" + maxSubTotalFilter) + "&";
        if (minSubTotalFilter !== undefined && minSubTotalFilter !== null)
            url_ += "MinSubTotalFilter=" + encodeURIComponent("" + minSubTotalFilter) + "&";
        if (maxTaxFilter !== undefined && maxTaxFilter !== null)
            url_ += "MaxTaxFilter=" + encodeURIComponent("" + maxTaxFilter) + "&";
        if (minTaxFilter !== undefined && minTaxFilter !== null)
            url_ += "MinTaxFilter=" + encodeURIComponent("" + minTaxFilter) + "&";
        if (maxTotalFilter !== undefined && maxTotalFilter !== null)
            url_ += "MaxTotalFilter=" + encodeURIComponent("" + maxTotalFilter) + "&";
        if (minTotalFilter !== undefined && minTotalFilter !== null)
            url_ += "MinTotalFilter=" + encodeURIComponent("" + minTotalFilter) + "&";
        if (paidFilter !== undefined && paidFilter !== null)
            url_ += "PaidFilter=" + encodeURIComponent("" + paidFilter) + "&";
        if (gatewayFilter !== undefined && gatewayFilter !== null)
            url_ += "GatewayFilter=" + encodeURIComponent("" + gatewayFilter) + "&";
        if (transactionIDFilter !== undefined && transactionIDFilter !== null)
            url_ += "TransactionIDFilter=" + encodeURIComponent("" + transactionIDFilter) + "&";
        if (gatewayResponseFilter !== undefined && gatewayResponseFilter !== null)
            url_ += "GatewayResponseFilter=" + encodeURIComponent("" + gatewayResponseFilter) + "&";
        if (refundedFilter !== undefined && refundedFilter !== null)
            url_ += "RefundedFilter=" + encodeURIComponent("" + refundedFilter) + "&";
        if (maxRefundedDateFilter !== undefined && maxRefundedDateFilter !== null)
            url_ += "MaxRefundedDateFilter=" + encodeURIComponent(maxRefundedDateFilter ? "" + maxRefundedDateFilter.toJSON() : "") + "&";
        if (minRefundedDateFilter !== undefined && minRefundedDateFilter !== null)
            url_ += "MinRefundedDateFilter=" + encodeURIComponent(minRefundedDateFilter ? "" + minRefundedDateFilter.toJSON() : "") + "&";
        if (maxRefundedAmountFilter !== undefined && maxRefundedAmountFilter !== null)
            url_ += "MaxRefundedAmountFilter=" + encodeURIComponent("" + maxRefundedAmountFilter) + "&";
        if (minRefundedAmountFilter !== undefined && minRefundedAmountFilter !== null)
            url_ += "MinRefundedAmountFilter=" + encodeURIComponent("" + minRefundedAmountFilter) + "&";
        if (refundedReasonFilter !== undefined && refundedReasonFilter !== null)
            url_ += "RefundedReasonFilter=" + encodeURIComponent("" + refundedReasonFilter) + "&";
        if (refundedByFilter !== undefined && refundedByFilter !== null)
            url_ += "RefundedByFilter=" + encodeURIComponent("" + refundedByFilter) + "&";
        if (voidedFilter !== undefined && voidedFilter !== null)
            url_ += "VoidedFilter=" + encodeURIComponent("" + voidedFilter) + "&";
        if (voidedByFilter !== undefined && voidedByFilter !== null)
            url_ += "VoidedByFilter=" + encodeURIComponent("" + voidedByFilter) + "&";
        if (maxVoidedDateFilter !== undefined && maxVoidedDateFilter !== null)
            url_ += "MaxVoidedDateFilter=" + encodeURIComponent(maxVoidedDateFilter ? "" + maxVoidedDateFilter.toJSON() : "") + "&";
        if (minVoidedDateFilter !== undefined && minVoidedDateFilter !== null)
            url_ += "MinVoidedDateFilter=" + encodeURIComponent(minVoidedDateFilter ? "" + minVoidedDateFilter.toJSON() : "") + "&";
        if (quickBookTransactionIDFilter !== undefined && quickBookTransactionIDFilter !== null)
            url_ += "QuickBookTransactionIDFilter=" + encodeURIComponent("" + quickBookTransactionIDFilter) + "&";
        if (postedQuickBookFilter !== undefined && postedQuickBookFilter !== null)
            url_ += "PostedQuickBookFilter=" + encodeURIComponent("" + postedQuickBookFilter) + "&";
        if (invoiceCodeFilter !== undefined && invoiceCodeFilter !== null)
            url_ += "InvoiceCodeFilter=" + encodeURIComponent("" + invoiceCodeFilter) + "&";
        if (contactQuoteHeaderTotalFilter !== undefined && contactQuoteHeaderTotalFilter !== null)
            url_ += "ContactQuoteHeaderTotalFilter=" + encodeURIComponent("" + contactQuoteHeaderTotalFilter) + "&";
        if (maxCreatedDateFilter !== undefined && maxCreatedDateFilter !== null)
            url_ += "MaxCreatedDateFilter=" + encodeURIComponent(maxCreatedDateFilter ? "" + maxCreatedDateFilter.toJSON() : "") + "&";
        if (minCreatedDateFilter !== undefined && minCreatedDateFilter !== null)
            url_ += "MinCreatedDateFilter=" + encodeURIComponent(minCreatedDateFilter ? "" + minCreatedDateFilter.toJSON() : "") + "&";
        if (paymentStatusFilter === null)
            throw new Error("The parameter 'paymentStatusFilter' cannot be null.");
        else if (paymentStatusFilter !== undefined)
            url_ += "PaymentStatusFilter=" + encodeURIComponent("" + paymentStatusFilter) + "&";
        if (contactNameFilter !== undefined && contactNameFilter !== null)
            url_ += "ContactNameFilter=" + encodeURIComponent("" + contactNameFilter) + "&";
        if (contactEmailFilter !== undefined && contactEmailFilter !== null)
            url_ += "ContactEmailFilter=" + encodeURIComponent("" + contactEmailFilter) + "&";
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

    getAllByFilters(filter: string | null | undefined, contactId: number | null | undefined, reteinerCodeFilter: string | null | undefined, maxSubTotalFilter: number | null | undefined, minSubTotalFilter: number | null | undefined, maxTaxFilter: number | null | undefined, minTaxFilter: number | null | undefined, maxTotalFilter: number | null | undefined, minTotalFilter: number | null | undefined, paidFilter: number | null | undefined, gatewayFilter: string | null | undefined, transactionIDFilter: string | null | undefined, gatewayResponseFilter: string | null | undefined, refundedFilter: number | null | undefined, maxRefundedDateFilter: moment.Moment | null | undefined, minRefundedDateFilter: moment.Moment | null | undefined, maxRefundedAmountFilter: number | null | undefined, minRefundedAmountFilter: number | null | undefined, refundedReasonFilter: string | null | undefined, refundedByFilter: string | null | undefined, voidedFilter: number | null | undefined, voidedByFilter: string | null | undefined, maxVoidedDateFilter: moment.Moment | null | undefined, minVoidedDateFilter: moment.Moment | null | undefined, quickBookTransactionIDFilter: string | null | undefined, postedQuickBookFilter: number | null | undefined, invoiceCodeFilter: string | null | undefined, contactQuoteHeaderTotalFilter: number | null | undefined, maxCreatedDateFilter: moment.Moment | null | undefined, minCreatedDateFilter: moment.Moment | null | undefined, paymentStatusFilter: number | undefined, sorting: string | null | undefined, skipCount: number | undefined, maxResultCount: number | undefined) {
        let url_ = environment.apiURL + "/api/services/app/ContactInvoiceHeaders/GetAllByCustomFilters?";
        if (filter !== undefined && filter !== null)
            url_ += "Filter=" + encodeURIComponent("" + filter) + "&";
        if (contactId !== undefined && contactId !== null)
            url_ += "ContactId=" + encodeURIComponent("" + contactId) + "&";
        if (reteinerCodeFilter !== undefined && reteinerCodeFilter !== null)
            url_ += "ReteinerCodeFilter=" + encodeURIComponent("" + reteinerCodeFilter) + "&";
        if (maxSubTotalFilter !== undefined && maxSubTotalFilter !== null)
            url_ += "MaxSubTotalFilter=" + encodeURIComponent("" + maxSubTotalFilter) + "&";
        if (minSubTotalFilter !== undefined && minSubTotalFilter !== null)
            url_ += "MinSubTotalFilter=" + encodeURIComponent("" + minSubTotalFilter) + "&";
        if (maxTaxFilter !== undefined && maxTaxFilter !== null)
            url_ += "MaxTaxFilter=" + encodeURIComponent("" + maxTaxFilter) + "&";
        if (minTaxFilter !== undefined && minTaxFilter !== null)
            url_ += "MinTaxFilter=" + encodeURIComponent("" + minTaxFilter) + "&";
        if (maxTotalFilter !== undefined && maxTotalFilter !== null)
            url_ += "MaxTotalFilter=" + encodeURIComponent("" + maxTotalFilter) + "&";
        if (minTotalFilter !== undefined && minTotalFilter !== null)
            url_ += "MinTotalFilter=" + encodeURIComponent("" + minTotalFilter) + "&";
        if (paidFilter !== undefined && paidFilter !== null)
            url_ += "PaidFilter=" + encodeURIComponent("" + paidFilter) + "&";
        if (gatewayFilter !== undefined && gatewayFilter !== null)
            url_ += "GatewayFilter=" + encodeURIComponent("" + gatewayFilter) + "&";
        if (transactionIDFilter !== undefined && transactionIDFilter !== null)
            url_ += "TransactionIDFilter=" + encodeURIComponent("" + transactionIDFilter) + "&";
        if (gatewayResponseFilter !== undefined && gatewayResponseFilter !== null)
            url_ += "GatewayResponseFilter=" + encodeURIComponent("" + gatewayResponseFilter) + "&";
        if (refundedFilter !== undefined && refundedFilter !== null)
            url_ += "RefundedFilter=" + encodeURIComponent("" + refundedFilter) + "&";
        if (maxRefundedDateFilter !== undefined && maxRefundedDateFilter !== null)
            url_ += "MaxRefundedDateFilter=" + encodeURIComponent(maxRefundedDateFilter ? "" + maxRefundedDateFilter.toJSON() : "") + "&";
        if (minRefundedDateFilter !== undefined && minRefundedDateFilter !== null)
            url_ += "MinRefundedDateFilter=" + encodeURIComponent(minRefundedDateFilter ? "" + minRefundedDateFilter.toJSON() : "") + "&";
        if (maxRefundedAmountFilter !== undefined && maxRefundedAmountFilter !== null)
            url_ += "MaxRefundedAmountFilter=" + encodeURIComponent("" + maxRefundedAmountFilter) + "&";
        if (minRefundedAmountFilter !== undefined && minRefundedAmountFilter !== null)
            url_ += "MinRefundedAmountFilter=" + encodeURIComponent("" + minRefundedAmountFilter) + "&";
        if (refundedReasonFilter !== undefined && refundedReasonFilter !== null)
            url_ += "RefundedReasonFilter=" + encodeURIComponent("" + refundedReasonFilter) + "&";
        if (refundedByFilter !== undefined && refundedByFilter !== null)
            url_ += "RefundedByFilter=" + encodeURIComponent("" + refundedByFilter) + "&";
        if (voidedFilter !== undefined && voidedFilter !== null)
            url_ += "VoidedFilter=" + encodeURIComponent("" + voidedFilter) + "&";
        if (voidedByFilter !== undefined && voidedByFilter !== null)
            url_ += "VoidedByFilter=" + encodeURIComponent("" + voidedByFilter) + "&";
        if (maxVoidedDateFilter !== undefined && maxVoidedDateFilter !== null)
            url_ += "MaxVoidedDateFilter=" + encodeURIComponent(maxVoidedDateFilter ? "" + maxVoidedDateFilter.toJSON() : "") + "&";
        if (minVoidedDateFilter !== undefined && minVoidedDateFilter !== null)
            url_ += "MinVoidedDateFilter=" + encodeURIComponent(minVoidedDateFilter ? "" + minVoidedDateFilter.toJSON() : "") + "&";
        if (quickBookTransactionIDFilter !== undefined && quickBookTransactionIDFilter !== null)
            url_ += "QuickBookTransactionIDFilter=" + encodeURIComponent("" + quickBookTransactionIDFilter) + "&";
        if (postedQuickBookFilter !== undefined && postedQuickBookFilter !== null)
            url_ += "PostedQuickBookFilter=" + encodeURIComponent("" + postedQuickBookFilter) + "&";
        if (invoiceCodeFilter !== undefined && invoiceCodeFilter !== null)
            url_ += "InvoiceCodeFilter=" + encodeURIComponent("" + invoiceCodeFilter) + "&";
        if (contactQuoteHeaderTotalFilter !== undefined && contactQuoteHeaderTotalFilter !== null)
            url_ += "ContactQuoteHeaderTotalFilter=" + encodeURIComponent("" + contactQuoteHeaderTotalFilter) + "&";
        if (maxCreatedDateFilter !== undefined && maxCreatedDateFilter !== null)
            url_ += "MaxCreatedDateFilter=" + encodeURIComponent(maxCreatedDateFilter ? "" + maxCreatedDateFilter.toJSON() : "") + "&";
        if (minCreatedDateFilter !== undefined && minCreatedDateFilter !== null)
            url_ += "MinCreatedDateFilter=" + encodeURIComponent(minCreatedDateFilter ? "" + minCreatedDateFilter.toJSON() : "") + "&";
        if (paymentStatusFilter === null)
            throw new Error("The parameter 'paymentStatusFilter' cannot be null.");
        else if (paymentStatusFilter !== undefined)
            url_ += "PaymentStatusFilter=" + encodeURIComponent("" + paymentStatusFilter) + "&";
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

    getAllByContactInvoiceHeaderId(contactQuoteHeaderId: string | null | undefined) {
        let url_ = environment.apiURL + "/api/services/app/ContactInvoiceHeaders/GetById?";
        if (contactQuoteHeaderId !== undefined && contactQuoteHeaderId !== null)
            url_ += "id=" + encodeURIComponent("" + contactQuoteHeaderId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.get<any>(url_).toPromise();
    }

    getAllPaymentStatusForLookupTable() {
        let url_ = environment.apiURL + "/api/services/app/ContactInvoiceHeaders/GetAllPaymentStatusForLookupTable";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.get<any>(url_).toPromise();
    }

    createOrEdit(body: CreateOrEditContactInvoiceHeaderDto | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/ContactInvoiceHeaders/CreateOrEdit";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        return this.http.post<any>(url_, body).toPromise();
    }

    getContactInvoiceHeaderForEdit(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/ContactInvoiceHeaders/GetContactInvoiceHeaderForEdit?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.get<any>(url_).toPromise();
    }

    delete(id: number | undefined): any {
        let url_ = environment.apiURL + "/api/services/app/ContactInvoiceHeaders/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        return this.http.delete(url_).toPromise();

    }

    //dropdowns
    getAllContactQuoteHeaderForTableDropdown(): any {
        let url_ = environment.apiURL + "/api/services/app/ContactInvoiceHeaders/GetAllContactQuoteHeaderForTableDropdown"

        return this.http.get<any>(url_).toPromise();
    }
    getAllContactsForTableDropdown(): any {
        let url_ = environment.apiURL + "/api/services/app/ContactInvoiceHeaders/GetAllContactsForTableDropdown"

        return this.http.get<any>(url_).toPromise();
    }
}

export class CreateOrEditContactInvoiceHeaderDto {
    reteinerCode!: string;
    subTotal!: number;
    tax!: number;
    total!: number;
    paid!: boolean;
    gateway!: string | undefined;
    transactionID!: string | undefined;
    gatewayResponse!: string | undefined;
    refunded!: boolean;
    refundedDate!: Date;
    refundedAmount!: number;
    refundedReason!: string | undefined;
    refundedBy!: string | undefined;
    voided!: boolean;
    voidedBy!: string | undefined;
    voidedDate!: Date;
    quickBookTransactionID!: string | undefined;
    postedQuickBook!: boolean;
    invoiceCode!: string | undefined;
    contactQuoteHeaderId!: string | undefined;
    contactId!: number | undefined;
    paymentStatusId!: number | undefined;
    invoiceDetail!: CreateOrEditCustomerInvoiceDetailDto[] | undefined;
    id!: string | undefined;
}
export class CreateOrEditCustomerInvoiceDetailDto {
    price!: number;
    quantity!: number;
    total!: number;
    contactInvoiceHeaderId!: string;
    lawfirmServiceId!: number | undefined;
    id!: string | undefined;
}