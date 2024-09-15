import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitedetailscollabComponent } from './visitedetailscollab.component';

describe('VisitedetailscollabComponent', () => {
  let component: VisitedetailscollabComponent;
  let fixture: ComponentFixture<VisitedetailscollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitedetailscollabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisitedetailscollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
