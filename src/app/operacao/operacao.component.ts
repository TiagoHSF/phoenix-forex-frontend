import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-operacao',
  templateUrl: './operacao.component.html',
  styleUrls: ['./operacao.component.scss']
})
export class OperacaoComponent implements OnInit {

  dataDaOperacao = new Date();
  parDeMoedaRecebido: string = "";
  sinalRecebido = false;
  sinalDeAcao: string = "";

  bandeiraOrigem: string = "";
  bandeiraDestino: string = "";

  constructor(private readonly webSocketService: WebSocketService,
    private readonly cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.webSocketService.listen('signals').subscribe((data) => {
      this.dataDaOperacao.setMinutes(new Date().getMinutes() + 1);
      this.parDeMoedaRecebido = data.text.split(" ").pop();
      this.verificarBandeira(this.parDeMoedaRecebido);
      const regex = /\b(compra|venda)\b/i;
      this.sinalDeAcao = data.text.match(regex)?.[0];

      this.guardarItemStorage(this.dataDaOperacao, this.parDeMoedaRecebido, this.sinalDeAcao);

      this.playNotificationSound();
      this.sinalRecebido = true;
    });

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

  guardarItemStorage(data: Date, par: string, sinal: string) {
    let ultimasOperacoes = JSON.parse(localStorage.getItem('ultimasOperacoes') || '[]');
    ultimasOperacoes.push({ data, par, sinal });
    localStorage.setItem('ultimasOperacoes', JSON.stringify(ultimasOperacoes));
  }

  playNotificationSound() {
    const audio = new Audio('assets/audio/notification.wav'); // Caminho para o arquivo de som
    audio.play();
  }

}
