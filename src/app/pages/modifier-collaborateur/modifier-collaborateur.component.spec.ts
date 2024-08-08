import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCollaborateurComponent } from './modifier-collaborateur.component';

describe('ModifierCollaborateurComponent', () => {
  let component: ModifierCollaborateurComponent;
  let fixture: ComponentFixture<ModifierCollaborateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifierCollaborateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
