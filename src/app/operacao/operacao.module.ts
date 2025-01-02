import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperacaoComponent } from './operacao.component';



@NgModule({
  declarations: [
    OperacaoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [OperacaoComponent]
})
export class OperacaoModule { }
