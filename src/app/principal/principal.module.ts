import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import { GraficoTradingModule } from '../grafico-trading/grafico-trading.module';
import { OperacaoModule } from '../operacao/operacao.module';
import { TipoTraderModule } from '../tipo-trader/tipo-trader.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    GraficoTradingModule,
    OperacaoModule,
    TipoTraderModule,
    MatDialogModule
  ],
  exports: [PrincipalComponent]
})
export class PrincipalModule { }
