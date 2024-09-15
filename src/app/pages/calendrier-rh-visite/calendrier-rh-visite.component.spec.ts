import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierRhVisiteComponent } from './calendrier-rh-visite.component';

describe('CalendrierRhVisiteComponent', () => {
  let component: CalendrierRhVisiteComponent;
  let fixture: ComponentFixture<CalendrierRhVisiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendrierRhVisiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendrierRhVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
