import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinDetailsComponent } from './medecin-details.component';

describe('MedecinDetailsComponent', () => {
  let component: MedecinDetailsComponent;
  let fixture: ComponentFixture<MedecinDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedecinDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedecinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
