import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageContainerComponent } from './landingpage-container.component';

describe('LandingpageContainerComponent', () => {
  let component: LandingpageContainerComponent;
  let fixture: ComponentFixture<LandingpageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingpageContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingpageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
