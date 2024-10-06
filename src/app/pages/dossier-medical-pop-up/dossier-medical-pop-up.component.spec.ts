import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierMedicalPopUpComponent } from './dossier-medical-pop-up.component';

describe('DossierMedicalPopUpComponent', () => {
  let component: DossierMedicalPopUpComponent;
  let fixture: ComponentFixture<DossierMedicalPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DossierMedicalPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DossierMedicalPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
