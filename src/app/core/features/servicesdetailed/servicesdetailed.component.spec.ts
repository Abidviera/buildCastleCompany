import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesdetailedComponent } from './servicesdetailed.component';

describe('ServicesdetailedComponent', () => {
  let component: ServicesdetailedComponent;
  let fixture: ComponentFixture<ServicesdetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicesdetailedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesdetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
