import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCollabComponent } from './dashboard-collab.component';

describe('DashboardCollabComponent', () => {
  let component: DashboardCollabComponent;
  let fixture: ComponentFixture<DashboardCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardCollabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
