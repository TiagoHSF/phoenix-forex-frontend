import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TipoTraderComponent } from '../tipo-trader/tipo-trader.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  parSelecionado: string = "";
  bandeiraOrigem: string = "";
  bandeiraDestino: string = "";

  tipoTrader = localStorage.getItem("tipo");

  operando = false;

  constructor(private cdr: ChangeDetectorRef,
    private dialog: MatDialog) {

  }

  ngOnInit(): void {
    if (!localStorage.getItem("tipo")) {
      this.dialog.open(TipoTraderComponent, {
        width: '400px', // Ajuste a largura conforme necessário
        data: {
          message: 'Escolha seu perfil de trader!'
        }
      });
    }
  }

  receberPar($event: string) {
    switch ($event) {

      case "FX:EURUSD":
        this.parSelecionado = "EUR/USD";
        this.bandeiraOrigem = "flag-icon-eu"; // Bandeira da União Europeia (EUR)
        this.bandeiraDestino = "flag-icon-us"; // Bandeira dos EUA (USD)
        break;

      case "FX:GBPUSD":
        this.parSelecionado = "GBP/USD";
        this.bandeiraOrigem = "flag-icon-gb"; // Bandeira do Reino Unido (GBP)
        this.bandeiraDestino = "flag-icon-us"; // Bandeira dos EUA (USD)
        break;

      case "FX:USDJPY":
        this.parSelecionado = "USD/JPY";
        this.bandeiraOrigem = "flag-icon-us"; // Bandeira dos EUA (USD)
        this.bandeiraDestino = "flag-icon-jp"; // Bandeira do Japão (JPY)
        break;

      case "FX:AUDUSD":
        this.parSelecionado = "AUD/USD";
        this.bandeiraOrigem = "flag-icon-au"; // Bandeira da Austrália (AUD)
        this.bandeiraDestino = "flag-icon-us"; // Bandeira dos EUA (USD)
        break;

      case "FX:USDCAD":
        this.parSelecionado = "USD/CAD";
        this.bandeiraOrigem = "flag-icon-us"; // Bandeira dos EUA (USD)
        this.bandeiraDestino = "flag-icon-ca"; // Bandeira do Canadá (CAD)
        break;

      case "FX:EURGBP":
        this.parSelecionado = "EUR/GBP";
        this.bandeiraOrigem = "flag-icon-eu"; // Bandeira da União Europeia (EUR)
        this.bandeiraDestino = "flag-icon-gb"; // Bandeira do Reino Unido (GBP)
        break;

      case "FX:EURJPY":
        this.parSelecionado = "EUR/JPY";
        this.bandeiraOrigem = "flag-icon-eu"; // Bandeira da União Europeia (EUR)
        this.bandeiraDestino = "flag-icon-jp"; // Bandeira do Japão (JPY)
        break;

      case "FX:GBPJPY":
        this.parSelecionado = "GBP/JPY";
        this.bandeiraOrigem = "flag-icon-gb"; // Bandeira do Reino Unido (GBP)
        this.bandeiraDestino = "flag-icon-jp"; // Bandeira do Japão (JPY)
        break;
    }
  }

  alterarStatusOperacao() {
    this.operando = !this.operando;
    this.cdr.detectChanges();
  }

  buscarUltimasOperacoes() {
    return JSON.parse(localStorage.getItem('ultimasOperacoes') || '[]');
  }

  verificarBandeira($event: string) {
    switch ($event) {

      case "EUR/USD":
        this.bandeiraOrigem = "flag-icon-eu"; // Bandeira da União Europeia (EUR)
        this.bandeiraDestino = "flag-icon-us"; // Bandeira dos EUA (USD)
        break;

      case "GBP/USD":
        this.bandeiraOrigem = "flag-icon-gb"; // Bandeira do Reino Unido (GBP)
        this.bandeiraDestino = "flag-icon-us"; // Bandeira dos EUA (USD)
        break;

      case "USD/JPY":
        this.bandeiraOrigem = "flag-icon-us"; // Bandeira dos EUA (USD)
        this.bandeiraDestino = "flag-icon-jp"; // Bandeira do Japão (JPY)
        break;

      case "AUD/USD":
        this.bandeiraOrigem = "flag-icon-au"; // Bandeira da Austrália (AUD)
        this.bandeiraDestino = "flag-icon-us"; // Bandeira dos EUA (USD)
        break;

      case "USD/CAD":
        this.bandeiraOrigem = "flag-icon-us"; // Bandeira dos EUA (USD)
        this.bandeiraDestino = "flag-icon-ca"; // Bandeira do Canadá (CAD)
        break;

      case "EUR/GBP":
        this.bandeiraOrigem = "flag-icon-eu"; // Bandeira da União Europeia (EUR)
        this.bandeiraDestino = "flag-icon-gb"; // Bandeira do Reino Unido (GBP)
        break;

      case "EUR/JPY":
        this.bandeiraOrigem = "flag-icon-eu"; // Bandeira da União Europeia (EUR)
        this.bandeiraDestino = "flag-icon-jp"; // Bandeira do Japão (JPY)
        break;

      case "GBP/JPY":
        this.bandeiraOrigem = "flag-icon-gb"; // Bandeira do Reino Unido (GBP)
        this.bandeiraDestino = "flag-icon-jp"; // Bandeira do Japão (JPY)
        break;
    }
  }

}
