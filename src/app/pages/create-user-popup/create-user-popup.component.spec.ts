import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserPopupComponent } from './create-user-popup.component';

describe('CreateUserPopupComponent', () => {
  let component: CreateUserPopupComponent;
  let fixture: ComponentFixture<CreateUserPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
