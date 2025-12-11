import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamShowcaseComponent } from './team-showcase.component';

describe('TeamShowcaseComponent', () => {
  let component: TeamShowcaseComponent;
  let fixture: ComponentFixture<TeamShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamShowcaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
