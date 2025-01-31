import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoUpgradeComponent } from './pagamento-upgrade.component';

describe('PagamentoUpgradeComponent', () => {
  let component: PagamentoUpgradeComponent;
  let fixture: ComponentFixture<PagamentoUpgradeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagamentoUpgradeComponent]
    });
    fixture = TestBed.createComponent(PagamentoUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
