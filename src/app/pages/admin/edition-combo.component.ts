import { Component, ElementRef, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ComboboxItemDto, EditionService } from 'src/app/core/services/edition.service';

@Component({
    selector: 'edition-combo',
    template:
        `<select #EditionCombobox
        class="form-control"
        [(ngModel)]="selectedEdition"
        (ngModelChange)="selectedEditionChange.emit($event)">
            <option *ngFor="let edition of editions" [value]="edition.value">{{edition.displayText}}</option>
    </select>`
})
export class EditionComboComponent {

    @ViewChild('EditionCombobox', { static: true }) editionComboboxElement: ElementRef;

    editions: ComboboxItemDto[] = [];

    @Input() selectedEdition: string = undefined;
    @Output() selectedEditionChange: EventEmitter<string> = new EventEmitter<string>();

    constructor(
        private _editionService: EditionService,
    ) {
    }

    ngOnInit(): void {
        this._editionService.getEditionComboboxItems(0, true, false).then(editions => {
            editions.result.forEach(element => {
                var obj = new ComboboxItemDto();
                obj.displayText = element.displayText;
                obj.isSelected = element.isSelected;
                obj.value = element.value;
                this.editions.push(obj);
           });
        });
    }
}
