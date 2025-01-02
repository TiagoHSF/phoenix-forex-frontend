import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-trader',
  templateUrl: './tipo-trader.component.html',
  styleUrls: ['./tipo-trader.component.scss']
})
export class TipoTraderComponent {

  constructor(private dialogRef: MatDialogRef<TipoTraderComponent>) { }

  profiles = [
    {
      name: 'Agressivo',
      description: 'Perfil que assume grandes riscos para obter altos retornos.',
      image: '../../assets/tipo-trader/lion.webp',
      buttonText: 'Escolher Agressivo'
    },
    {
      name: 'Moderado',
      description: 'Perfil equilibrado entre risco e retorno.',
      image: '../../assets/tipo-trader/eagle.webp',
      buttonText: 'Escolher Moderado'
    },
    {
      name: 'Conservador',
      description: 'Perfil que prioriza segurança e estabilidade.',
      image: '../../assets/tipo-trader/turtle.webp',
      buttonText: 'Escolher Conservador'
    }
  ];

  selecionarTipo($event: any) {
    localStorage.setItem("tipo", $event.name);
    this.dialogRef.close();
  }

}
