import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmedecinslistComponent } from './amedecinslist.component';

describe('AmedecinslistComponent', () => {
  let component: AmedecinslistComponent;
  let fixture: ComponentFixture<AmedecinslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmedecinslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmedecinslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
