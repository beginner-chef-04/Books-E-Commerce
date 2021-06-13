import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialEventsUploadComponent } from './special-events-upload.component';

describe('SpecialEventsUploadComponent', () => {
  let component: SpecialEventsUploadComponent;
  let fixture: ComponentFixture<SpecialEventsUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialEventsUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialEventsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
