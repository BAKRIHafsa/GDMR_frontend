import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierMedicalDetailsComponent } from './dossier-medical-details.component';

describe('DossierMedicalDetailsComponent', () => {
  let component: DossierMedicalDetailsComponent;
  let fixture: ComponentFixture<DossierMedicalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DossierMedicalDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DossierMedicalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
