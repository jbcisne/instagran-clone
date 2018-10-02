import { Usuario } from "./acesso/usuario.model";

import * as firebase from 'firebase'

export class Autenticacao {
    public cadastrarUsuario(usuario: Usuario): void {
        console.log('chegamos no servico: ', usuario)

        firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
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
}