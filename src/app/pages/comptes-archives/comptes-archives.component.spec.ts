import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptesArchivesComponent } from './comptes-archives.component';

describe('ComptesArchivesComponent', () => {
  let component: ComptesArchivesComponent;
  let fixture: ComponentFixture<ComptesArchivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComptesArchivesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComptesArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
