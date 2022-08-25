import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServersViewComponent } from './servers-view.component';

describe('ServersViewComponent', () => {
  let component: ServersViewComponent;
  let fixture: ComponentFixture<ServersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServersViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
