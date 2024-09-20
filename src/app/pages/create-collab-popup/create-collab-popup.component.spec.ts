import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollabPopupComponent } from './create-collab-popup.component';

describe('CreateCollabPopupComponent', () => {
  let component: CreateCollabPopupComponent;
  let fixture: ComponentFixture<CreateCollabPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCollabPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCollabPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
