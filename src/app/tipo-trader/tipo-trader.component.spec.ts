import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTraderComponent } from './tipo-trader.component';

describe('TipoTraderComponent', () => {
  let component: TipoTraderComponent;
  let fixture: ComponentFixture<TipoTraderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoTraderComponent]
    });
    fixture = TestBed.createComponent(TipoTraderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
