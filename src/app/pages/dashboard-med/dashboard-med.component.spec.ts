import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMedComponent } from './dashboard-med.component';

describe('DashboardMedComponent', () => {
  let component: DashboardMedComponent;
  let fixture: ComponentFixture<DashboardMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardMedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
