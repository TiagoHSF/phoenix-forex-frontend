import { Component, Input, OnInit } from '@angular/core';
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

  dataDaOperacao: any
  parDeMoedaRecebido: string | null = "";
  sinalRecebido = false;
  sinalDeAcao: string = "";

  @Input()
  tipoTrader!: string;

  constructor(private readonly webSocketService: WebSocketService) {

  }

  operacaoIniciada = false;
  seconds = 0;

  ngOnInit(): void {

    this.webSocketService.listen('signals').subscribe((data: OperacaoDTO) => {
      this.processarOperacao(data);
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

      if (!this.dataDaOperacao) {
        if (this.seconds < 100) {
          this.mensagemAcao = "Identificando operações com maior potencial de retorno...";
        }
        if (this.seconds > 100 && this.seconds < 250) {
          this.mensagemAcao = "Realizando análise detalhada das notícias mais recentes...";
        }
        if (this.seconds > 250 && this.seconds < 450) {
          this.mensagemAcao = `Avaliando cerca de ${Math.floor(Math.random() * 90000) + 10000} notícias para identificar padrões relevantes...`;
        }
        if (this.seconds > 450 && this.seconds < 800) {
          this.mensagemAcao = "Monitorando tendências e movimentos de mercado em tempo real...";
        }
        if (this.seconds > 800 && this.seconds < 1000) {
          this.mensagemAcao = "Analisando o sentimento dos investidores para prever comportamentos futuros...";
        }
        if (this.seconds > 1200) {
          this.seconds = 0;
        }
      } else {
        if (this.seconds > 800) {
          this.parDeMoedaRecebido = null;
          this.dataDaOperacao = null;
          this.seconds = 0;
        }
      }



      // if (this.dataDaOperacao) {
      //   const dataLimite = new Date(this.dataDaOperacao); // Cria uma cópia de this.dataDaOperacao
      //   dataLimite.setMinutes(dataLimite.getMinutes() + 1); // Adiciona 1 minuto à cópia

      //   if (dataLimite > this.dataDaOperacao) {
      //     this.parDeMoedaRecebido = null;
      //     this.seconds = 0;
      //   }
      // }

    }, 100)
  }

  processarOperacao(operacao: OperacaoDTO) {
    // const tipo = localStorage.getItem("tipo");
    // const selecao = tipo?.toLowerCase();

    // if (!this.dataDaOperacao) {
    this.dataDaOperacao = new Date();
    // }
    this.dataDaOperacao.setMinutes(new Date().getMinutes() + 1);

    // if (selecao) {
    // this.parDeMoedaRecebido = operacao.signal[`${selecao}`]?.split(" ").pop();
    this.parDeMoedaRecebido = operacao.signal[`agressivo`]?.split(" ").pop();
    if (this.parDeMoedaRecebido) {
      this.verificarBandeira(this.parDeMoedaRecebido);
    }

    this.sinalDeAcao = this.verificarSinalRecebido(operacao, 'agressivo');

    this.playNotificationSound();
    // }

  }

  playNotificationSound() {
    const audio = new Audio('assets/audio/notification.wav');
    audio.play();
  }

  verificarSinalRecebido(operacao: OperacaoDTO, selecao: string) {
    const regex = /\b(compra|venda)\b/i;
    return operacao.signal[`${selecao}`].match(regex)?.[0];
  }

  acessarCorretora() {
    window.open('https://trade.avalonbroker.io/register?aff=744459&aff_model=revenue&afftrack=', '_blank')
  }

  tipoConta() {
    if (this.tipoTrader == "MODERADO") {
      return "10-50 Operações por dia!";
    } else {
      return "50-200 Operações por dia!";
    }
  }


}
