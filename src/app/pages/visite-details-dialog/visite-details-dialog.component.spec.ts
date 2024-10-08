import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteDetailsDialogComponent } from './visite-details-dialog.component';

describe('VisiteDetailsDialogComponent', () => {
  let component: VisiteDetailsDialogComponent;
  let fixture: ComponentFixture<VisiteDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisiteDetailsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisiteDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
