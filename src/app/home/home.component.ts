import { Component, OnInit, ViewChild } from '@angular/core';
import { Autenticacao } from '../autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /*
    @ViewChild('publicacoes') => faz referencia a variável de template #publicacoes definida
     no template do componente (home)

     isso dá acesso a Instância do componente (publicacoes)
   */
  @ViewChild('publicacoes') public publicacoes: any

  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  public sair(): void {
    this.autenticacao.sair()
  }

  public atualizarTimeLine(): void {
    //chama o metodo atualizarTimeLine() do componente (publicacoes)
    this.publicacoes.atualizarTimeLine()
  }


}
