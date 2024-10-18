import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordFirstComponent } from './change-password-first.component';

describe('ChangePasswordFirstComponent', () => {
  let component: ChangePasswordFirstComponent;
  let fixture: ComponentFixture<ChangePasswordFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePasswordFirstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangePasswordFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
