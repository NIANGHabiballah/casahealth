import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Register } from './register';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;
  let authServiceSpy: any;
  let routerSpy: any;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.register and navigate on success', () => {
    const mockResponse = { subscribe: (handlers: any) => handlers.next() };
    authServiceSpy.register.and.returnValue(mockResponse);
    spyOn(component, 'onSubmit').and.callThrough();
    component.registerForm.setValue({
      prenom: 'John',
      nom: 'Doe',
      email: 'john@doe.com',
      telephone: '+221771234567',
      motDePasse: 'password',
      confirmMotDePasse: 'password',
      role: 'PATIENT'
    });
    component.onSubmit();
    expect(authServiceSpy.register).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should set apiError on registration error', () => {
    const mockResponse = { subscribe: (handlers: any) => handlers.error({ error: { message: 'Erreur API' } }) };
    authServiceSpy.register.and.returnValue(mockResponse);
    component.registerForm.setValue({
      prenom: 'John',
      nom: 'Doe',
      email: 'john@doe.com',
      telephone: '+221771234567',
      motDePasse: 'password',
      confirmMotDePasse: 'password',
      role: 'PATIENT'
    });
    component.onSubmit();
    expect(component.apiError).toBe('Erreur API');
  });
});
