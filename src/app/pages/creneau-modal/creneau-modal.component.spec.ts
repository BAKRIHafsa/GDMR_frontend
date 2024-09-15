import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreneauModalComponent } from './creneau-modal.component';

describe('CreneauModalComponent', () => {
  let component: CreneauModalComponent;
  let fixture: ComponentFixture<CreneauModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreneauModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreneauModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
