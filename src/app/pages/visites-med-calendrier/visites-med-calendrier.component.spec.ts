import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitesMedCalendrierComponent } from './visites-med-calendrier.component';

describe('VisitesMedCalendrierComponent', () => {
  let component: VisitesMedCalendrierComponent;
  let fixture: ComponentFixture<VisitesMedCalendrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitesMedCalendrierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisitesMedCalendrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
