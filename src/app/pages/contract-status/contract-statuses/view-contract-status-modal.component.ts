import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-contract-status-view-modal',
    templateUrl: './view-contract-status-modal.component.html'
})

export class ViewContractStatusModalComponent implements OnInit {
    contractStatus: any;
    @Input() public modal: any
    @Input() public data: any;
    ngOnInit(): void {
        this.contractStatus = this.data;
    }
}