import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialEventsViewProfileComponent } from './special-events-view-profile.component';

describe('SpecialEventsViewProfileComponent', () => {
  let component: SpecialEventsViewProfileComponent;
  let fixture: ComponentFixture<SpecialEventsViewProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialEventsViewProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialEventsViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
