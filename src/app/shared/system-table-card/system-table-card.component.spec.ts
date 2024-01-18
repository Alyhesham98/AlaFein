import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemTableCardComponent } from './system-table-card.component';

describe('SystemTableCardComponent', () => {
  let component: SystemTableCardComponent;
  let fixture: ComponentFixture<SystemTableCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemTableCardComponent]
    });
    fixture = TestBed.createComponent(SystemTableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
