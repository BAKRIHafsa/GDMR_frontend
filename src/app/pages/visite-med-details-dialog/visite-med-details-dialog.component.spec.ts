import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteMedDetailsDialogComponent } from './visite-med-details-dialog.component';

describe('VisiteMedDetailsDialogComponent', () => {
  let component: VisiteMedDetailsDialogComponent;
  let fixture: ComponentFixture<VisiteMedDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisiteMedDetailsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisiteMedDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
