import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibiliteDetailComponent } from './disponibilite-detail.component';

describe('DisponibiliteDetailComponent', () => {
  let component: DisponibiliteDetailComponent;
  let fixture: ComponentFixture<DisponibiliteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisponibiliteDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisponibiliteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
