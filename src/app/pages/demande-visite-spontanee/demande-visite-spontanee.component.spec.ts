import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeVisiteSpontaneeComponent } from './demande-visite-spontanee.component';

describe('DemandeVisiteSpontaneeComponent', () => {
  let component: DemandeVisiteSpontaneeComponent;
  let fixture: ComponentFixture<DemandeVisiteSpontaneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemandeVisiteSpontaneeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemandeVisiteSpontaneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
