import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSpotlightComponent } from './event-spotlight.component';

describe('EventSpotlightComponent', () => {
  let component: EventSpotlightComponent;
  let fixture: ComponentFixture<EventSpotlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventSpotlightComponent]
    });
    fixture = TestBed.createComponent(EventSpotlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
