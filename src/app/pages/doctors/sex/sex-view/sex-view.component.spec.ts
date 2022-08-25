import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SexViewComponent } from './sex-view.component';

describe('SexViewComponent', () => {
  let component: SexViewComponent;
  let fixture: ComponentFixture<SexViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SexViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SexViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
