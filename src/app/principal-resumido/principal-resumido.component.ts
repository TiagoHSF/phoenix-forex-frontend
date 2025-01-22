import { Component, OnInit } from '@angular/core';
import { OperacaoDTO } from '../operacao/dtos/operacao.dto';
import { WebSocketService } from '../websocket.service';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Component({
  selector: 'app-principal-resumido',
  templateUrl: './principal-resumido.component.html',
  styleUrls: ['./principal-resumido.component.scss']
})
export class PrincipalResumidoComponent implements OnInit {

  mensagemAcao: string = "";
  interval: any;

  constructor(private readonly webSocketService: WebSocketService) {

  }

  operacaoIniciada = false;
  seconds = 0;

  ngOnInit(): void {

    this.webSocketService.listen('signals').subscribe((data: OperacaoDTO) => {
      console.log(data)
      this.seconds = 0;
      this.interval?.clear();
      // if (new Date() < new Date(this.dataDaOperacao) || !this.dataDaOperacao) {
      // this.processarOperacao(data);
      // this.sinalRecebido = true;
      // }
    });

    this.verificarBandeira("EUR/USD");
    this.startCounter();
  }

  bandeiraOrigem = "";
  bandeiraDestino = "";

  iniciarOperacao() {
    this.operacaoIniciada = true;
  }

  verificarBandeira($event: string) {
    switch ($event) {

      case "EUR/USD":
        this.bandeiraOrigem = "flag-icon-eu";
        this.bandeiraDestino = "flag-icon-us";
        break;

      case "GBP/USD":
        this.bandeiraOrigem = "flag-icon-gb";
        this.bandeiraDestino = "flag-icon-us";
        break;

      case "USD/JPY":
        this.bandeiraOrigem = "flag-icon-us";
        this.bandeiraDestino = "flag-icon-jp";
        break;

      case "AUD/USD":
        this.bandeiraOrigem = "flag-icon-au";
        this.bandeiraDestino = "flag-icon-us";
        break;

      case "USD/CAD":
        this.bandeiraOrigem = "flag-icon-us";
        this.bandeiraDestino = "flag-icon-ca";
        break;

      case "EUR/GBP":
        this.bandeiraOrigem = "flag-icon-eu";
        this.bandeiraDestino = "flag-icon-gb";
        break;

      case "EUR/JPY":
        this.bandeiraOrigem = "flag-icon-eu";
        this.bandeiraDestino = "flag-icon-jp";
        break;

      case "GBP/JPY":
        this.bandeiraOrigem = "flag-icon-gb";
        this.bandeiraDestino = "flag-icon-jp";
        break;
    }
  }

  startCounter() {
    this.interval = setInterval(() => {
      this.seconds += 1

      if (this.seconds < 100) {
        this.mensagemAcao = "Buscando operações em potencial!";
      }
      if (this.seconds > 100 && this.seconds < 250) {
        this.mensagemAcao = "Analisando as últimas notícias";
      }
      if (this.seconds > 250 && this.seconds < 700) {
        this.mensagemAcao = `Cerca de ${Math.floor(Math.random() * 90000) + 10000} mil notícias estão sendo analisadas`;
      }
      if (this.seconds > 700) {
        this.mensagemAcao = "Buscando operações em potencial!";

      }


    }, 100)
  }


}
