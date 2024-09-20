import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMedPopupComponent } from './create-med-popup.component';

describe('CreateMedPopupComponent', () => {
  let component: CreateMedPopupComponent;
  let fixture: ComponentFixture<CreateMedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMedPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
