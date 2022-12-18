import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingResultItemComponent } from './voting-result-item.component';

describe('VotingResultItemComponent', () => {
  let component: VotingResultItemComponent;
  let fixture: ComponentFixture<VotingResultItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VotingResultItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VotingResultItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
