import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDisponibiliteDialogComponent } from './add-disponibilite-dialog.component';

describe('AddDisponibiliteDialogComponent', () => {
  let component: AddDisponibiliteDialogComponent;
  let fixture: ComponentFixture<AddDisponibiliteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDisponibiliteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDisponibiliteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
