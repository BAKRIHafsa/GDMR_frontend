import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinsDisponiblesComponent } from './medecins-disponibles.component';

describe('MedecinsDisponiblesComponent', () => {
  let component: MedecinsDisponiblesComponent;
  let fixture: ComponentFixture<MedecinsDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedecinsDisponiblesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedecinsDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
