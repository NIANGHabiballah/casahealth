import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUsers } from './gestion-users';

describe('GestionUsers', () => {
  let component: GestionUsers;
  let fixture: ComponentFixture<GestionUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionUsers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionUsers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
