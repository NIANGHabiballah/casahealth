import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionStrucutres } from './gestion-strucutres';

describe('GestionStrucutres', () => {
  let component: GestionStrucutres;
  let fixture: ComponentFixture<GestionStrucutres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionStrucutres]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionStrucutres);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
