import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-grafico-trading',
  templateUrl: './grafico-trading.component.html',
  styleUrls: ['./grafico-trading.component.scss']
})
export class GraficoTradingComponent {

  @Output() parSelecionado: EventEmitter<string> = new EventEmitter<string>();

  ngAfterViewInit(): void {
    this.loadTradingViewChart();
  }

  loadTradingViewChart() {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.type = 'text/javascript';
    document.head.appendChild(script);

    script.onload = () => {
      new (window as any).TradingView.widget({
        autosize: true,
        symbol: this.randomizeForex(),
        interval: 'D',
        timezone: 'America/Sao_Paulo',
        theme: 'light', //dark //light
        container_id: 'tradingview_1234'
      });
    };
  }

  randomizeForex() {
    const forexPairs = [
      'FX:EURUSD',
      'FX:GBPUSD',
      'FX:USDJPY',
      'FX:AUDUSD',
      'FX:USDCAD',
      'FX:EURGBP',
      'FX:EURJPY',
      'FX:GBPJPY'
    ];
    const par = forexPairs[Math.floor(Math.random() * forexPairs.length)];
    this.parSelecionado.emit(par);
    return par;
  }

}
