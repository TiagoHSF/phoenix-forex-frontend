import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoTradingComponent } from './grafico-trading.component';

describe('GraficoTradingComponent', () => {
  let component: GraficoTradingComponent;
  let fixture: ComponentFixture<GraficoTradingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoTradingComponent]
    });
    fixture = TestBed.createComponent(GraficoTradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
