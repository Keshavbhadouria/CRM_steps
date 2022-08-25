import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicStatusComponent } from './epic-status.component';

describe('EpicStatusComponent', () => {
  let component: EpicStatusComponent;
  let fixture: ComponentFixture<EpicStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpicStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
