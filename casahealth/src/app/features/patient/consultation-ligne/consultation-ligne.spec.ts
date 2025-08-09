import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationLigne } from './consultation-ligne';

describe('ConsultationLigne', () => {
  let component: ConsultationLigne;
  let fixture: ComponentFixture<ConsultationLigne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationLigne]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationLigne);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
