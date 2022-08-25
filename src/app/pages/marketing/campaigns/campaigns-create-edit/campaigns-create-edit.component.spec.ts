import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsCreateEditComponent } from './campaigns-create-edit.component';

describe('CampaignsCreateEditComponent', () => {
  let component: CampaignsCreateEditComponent;
  let fixture: ComponentFixture<CampaignsCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignsCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
