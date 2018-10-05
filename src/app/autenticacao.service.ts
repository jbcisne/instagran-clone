import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import * as firebase from 'firebase'

import { Usuario } from "./acesso/usuario.model";


@Injectable()
export class Autenticacao {

    public token_id: string

    constructor (
        private router: Router
    ){}

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        console.log('chegamos no servico: ', usuario)

        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {
                console.log('resposta: ', resposta)
                
                // remove atributo senha para não ser persistida
                delete usuario.senha

                //Obs.: btoa => encoda para base64
                //      atob => decoda da base64
                firebase.database().ref(`usuario_detalhe/(${btoa(usuario.email)}`)
                    .set(usuario)
            })
            .catch((error: Error) => {
                console.log('error: ', error)
            })
    }

    public autenticar(email: string, senha: string): void {
        console.log('email: ', email)
        console.log('senha: ', senha)

        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((resposta: any) => {
            firebase.auth().currentUser.getIdToken()
                .then((idToken: string) => {
                    this.token_id = idToken
                    localStorage.setItem('idToken', idToken)
                    this.router.navigate(['/home'])
                })
        })
        .catch((error: Error) => console.log(error))
    }

    public autenticado(): boolean {
        if (this.token_id === undefined && localStorage.getItem('idToken') != null) {
            this.token_id = localStorage.getItem('idToken')
        }

        if (this.token_id === undefined) {
            this.router.navigate(['/'])
        }

        return this.token_id !== undefined
    }

    public sair(): void {
        
        firebase.auth().signOut()
          .then(() => {
            localStorage.removeItem('idToken')
            this.token_id = undefined
            this.router.navigate(['/'])
          })
    }
} 