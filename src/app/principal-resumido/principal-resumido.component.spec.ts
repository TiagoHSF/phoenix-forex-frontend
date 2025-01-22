import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalResumidoComponent } from './principal-resumido.component';

describe('PrincipalResumidoComponent', () => {
  let component: PrincipalResumidoComponent;
  let fixture: ComponentFixture<PrincipalResumidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrincipalResumidoComponent]
    });
    fixture = TestBed.createComponent(PrincipalResumidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
