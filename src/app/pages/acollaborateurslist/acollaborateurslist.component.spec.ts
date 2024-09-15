import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcollaborateurslistComponent } from './acollaborateurslist.component';

describe('AcollaborateurslistComponent', () => {
  let component: AcollaborateurslistComponent;
  let fixture: ComponentFixture<AcollaborateurslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcollaborateurslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcollaborateurslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
