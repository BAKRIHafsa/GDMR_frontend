import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierMedComponent } from './calendrier-med.component';

describe('CalendrierMedComponent', () => {
  let component: CalendrierMedComponent;
  let fixture: ComponentFixture<CalendrierMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendrierMedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendrierMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
