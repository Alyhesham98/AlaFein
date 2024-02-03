import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueFormComponent } from './venue-form.component';

describe('VenueFormComponent', () => {
  let component: VenueFormComponent;
  let fixture: ComponentFixture<VenueFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VenueFormComponent]
    });
    fixture = TestBed.createComponent(VenueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
