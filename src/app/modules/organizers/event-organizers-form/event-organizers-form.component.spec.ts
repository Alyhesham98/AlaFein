import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOrganizersFormComponent } from './event-organizers-form.component';

describe('EventOrganizersFormComponent', () => {
  let component: EventOrganizersFormComponent;
  let fixture: ComponentFixture<EventOrganizersFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventOrganizersFormComponent]
    });
    fixture = TestBed.createComponent(EventOrganizersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
