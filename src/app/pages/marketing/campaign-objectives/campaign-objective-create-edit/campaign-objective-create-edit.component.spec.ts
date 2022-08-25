import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignObjectiveCreateEditComponent } from './campaign-objective-create-edit.component';

describe('CampaignObjectiveCreateEditComponent', () => {
  let component: CampaignObjectiveCreateEditComponent;
  let fixture: ComponentFixture<CampaignObjectiveCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignObjectiveCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignObjectiveCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
