import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardStructureSanitaire } from './dashboard-structure';

describe('DashboardStructureSanitaire', () => {
  let component: DashboardStructureSanitaire;
  let fixture: ComponentFixture<DashboardStructureSanitaire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardStructureSanitaire]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStructureSanitaire);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
