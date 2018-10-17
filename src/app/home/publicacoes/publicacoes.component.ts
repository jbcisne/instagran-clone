import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { Bd } from '../../bd.service';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  private email: string
  public publicacoes: any

  constructor(
    private bd: Bd
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
      
      this.atualizarTimeLine()
    })
  }

  public atualizarTimeLine(): void {
    this.bd.consultarPublicacoes(this.email)
    .then((publicacoes: any) => {
      this.publicacoes = publicacoes
    })
    
  }
}
