import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierCollabComponent } from './calendrier-collab.component';

describe('CalendrierCollabComponent', () => {
  let component: CalendrierCollabComponent;
  let fixture: ComponentFixture<CalendrierCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendrierCollabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendrierCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
