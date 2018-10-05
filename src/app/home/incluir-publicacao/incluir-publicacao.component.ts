import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase'
import { Bd } from '../../bd.service';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  public email: string

  private imagem: any

  constructor(
    private bd: Bd
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo
    })
  }

  public preparaImagemUpload(event: Event): void {
    console.log((<HTMLInputElement>event.target).files)
  }
}
