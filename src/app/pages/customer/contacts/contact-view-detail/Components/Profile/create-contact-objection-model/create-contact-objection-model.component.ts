import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrEditContactDto } from 'src/app/core/models/Customer/Contact';
import { CreateOrEditContactObjectionDto, GetObjectionEntityForViewDto } from 'src/app/core/models/Customer/ContactObjection';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { ContactService } from 'src/app/core/services/contact.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-contact-objection-model',
  templateUrl: './create-contact-objection-model.component.html',
  styleUrls: ['./create-contact-objection-model.component.scss']
})
export class CreateContactObjectionModelComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('targetDate') targetDate: ElementRef;

  // bread crumb items
  loading = false;
  objectionList: GetObjectionEntityForViewDto[];
  contactObjection: CreateOrEditContactObjectionDto = new CreateOrEditContactObjectionDto();

  contactId: number;
  userId: number;
  contactName: string;
  phoneNo: string;
  selectedIndex: number;
  active = false;
  saving = false;

  contact: CreateOrEditContactDto = new CreateOrEditContactDto();

  constructor(private _contactService: ContactService, private _messageService: MessageService, private modalService: NgbModal , private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.contactId = Number(this.route.snapshot.paramMap.get('contactId'));
    this.contactName = this.route.snapshot.paramMap.get('name');
    this.phoneNo = this.route.snapshot.paramMap.get('phoneno');
    this.getObjectionEntities();
  }


  //#region API Methods

  save(obj, index): void {
    this.selectedIndex = index;
    this.contactObjection.contactId = this.contactId;
    this.contactObjection.objectionEntityId = obj.id;
    this.contactObjection.active = true;
    this.saving = true;
    this._contactService.createOrEditObjection(this.contactObjection)
      .then(res => {
        this.selectedIndex = -1;
        this.closeCreateModal();
        this.$modalClose.emit(true);
        })



}


  getObjectionEntities() {
    this.showLoader();
    this._contactService.getAllObjectionsByPromice().then(result => {
      this.objectionList = result.result;
      this.hideLoader();
    });
}



  //#endregion


  //#region Helper Methods




  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  //#endregion


}
