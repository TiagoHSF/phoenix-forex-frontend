import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WebSocketService } from '../websocket.service';
import { OperacaoDTO } from './dtos/operacao.dto';

@Component({
  selector: 'app-operacao',
  templateUrl: './operacao.component.html',
  styleUrls: ['./operacao.component.scss']
})
export class OperacaoComponent implements OnInit, AfterViewInit {

  dataDaOperacao: any
  parDeMoedaRecebido: string = "";
  sinalRecebido = false;
  sinalDeAcao: string = "";

  bandeiraOrigem: string = "";
  bandeiraDestino: string = "";

  constructor(private readonly webSocketService: WebSocketService,
    private readonly cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.webSocketService.listen('signals').subscribe((data: OperacaoDTO) => {
      if (new Date() < new Date(this.dataDaOperacao) || !this.dataDaOperacao) {
        this.processarOperacao(data);
        this.sinalRecebido = true;
      }
    });

  }

  ngAfterViewInit(): void {
    setInterval(() => {
      this.expirarSinalAtual();
    }, 200)
  }

  formatarData(data: Date): string {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
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

  guardarItemStorage(data: Date, par: string, sinal: string) {
    let ultimasOperacoes = JSON.parse(localStorage.getItem('ultimasOperacoes') || '[]');
    ultimasOperacoes.push({ data, par, sinal });
    localStorage.setItem('ultimasOperacoes', JSON.stringify(ultimasOperacoes));
  }

  playNotificationSound() {
    const audio = new Audio('assets/audio/notification.wav');
    audio.play();
  }

  processarOperacao(operacao: OperacaoDTO) {
    const tipo = localStorage.getItem("tipo");
    const selecao = tipo?.toLowerCase();

    if (!this.dataDaOperacao) {
      this.dataDaOperacao = new Date();
    }
    this.dataDaOperacao.setMinutes(new Date().getMinutes() + 1);

    if (selecao) {
      this.parDeMoedaRecebido = operacao.signal[`${selecao}`]?.split(" ").pop();
      this.verificarBandeira(this.parDeMoedaRecebido);

      this.sinalDeAcao = this.verificarSinalRecebido(operacao, selecao);

      this.guardarItemStorage(this.dataDaOperacao, this.parDeMoedaRecebido, this.sinalDeAcao);

      this.playNotificationSound();
    }

  }

  verificarSinalRecebido(operacao: OperacaoDTO, selecao: string) {
    const regex = /\b(compra|venda)\b/i;
    return operacao.signal[`${selecao}`].match(regex)?.[0];
  }

  expirarSinalAtual() {
    if (new Date() >= new Date(this.dataDaOperacao) && this.sinalRecebido) {
      this.sinalRecebido = false;
      this.parDeMoedaRecebido = "";
      this.dataDaOperacao = null;
      this.sinalDeAcao = "";
    }
  }
}
