import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiverCollaborateurComponent } from './archiver-collaborateur.component';

describe('ArchiverCollaborateurComponent', () => {
  let component: ArchiverCollaborateurComponent;
  let fixture: ComponentFixture<ArchiverCollaborateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArchiverCollaborateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchiverCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
