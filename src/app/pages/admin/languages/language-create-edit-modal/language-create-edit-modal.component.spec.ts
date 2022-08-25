import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageCreateEditModalComponent } from './language-create-edit-modal.component';

describe('LanguageCreateEditModalComponent', () => {
  let component: LanguageCreateEditModalComponent;
  let fixture: ComponentFixture<LanguageCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
