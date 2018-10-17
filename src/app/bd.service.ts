import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';
import { resolve, reject } from 'q';

@Injectable()
export class Bd {

    constructor(
        private progresso: Progresso
    ){}

    public publicar(publicacao: any): void {
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        .push({titulo: publicacao.titulo})
        .then((resposta: any) => {
            let nomeImagem = resposta.key
            firebase.storage().ref()
                .child(`images/${nomeImagem}`)
                .put(publicacao.imagem)
                .on(firebase.storage.TaskEvent.STATE_CHANGED,
                    //acompanhamento do progresso do upload
                    (snapshot: any) => {
                        this.progresso.status = 'em_andamento'
                        this.progresso.estado = snapshot
                        // console.log('snapshot: ', snapshot)
                    },
                    //erro no processo de upload
                    (error) => {
                        this.progresso.status = 'erro'
                        // console.log(error)
                    },
                    //finalização do progresso
                    () => {
                        this.progresso.status = 'concluido'
                        // console.log('Upload completo')
                    }

            )

        })

    }

    public consultarPublicacoes(email: string): Promise<any> {
        return new Promise((resolve, reject) => {
            //consulta as publicações
            firebase.database()
            .ref(`publicacoes/${btoa(email)}`)
            .orderByKey() //vai ordenar pelo atributo KEY
            .once('value')
            .then((snapshot: any) => {
                //console.log(snapshot.val())
                let publicacoes: Array<any> = []

                snapshot.forEach((childSnapshot: any) => {
                    let publicacao = childSnapshot.val()
                    publicacao.key = childSnapshot.key

                    publicacoes.push(publicacao)
                });
                //ordem decrescente do resultado
                return publicacoes.reverse()
            })
            .then((publicacoes) => {
                //console.log(publicacoes)
                publicacoes.forEach((publicacao) => {
                    //consulta as imagens
                    firebase.storage().ref()
                    .child(`images/${publicacao.key}`)
                    .getDownloadURL()
                    .then((url: string) => {
                        //console.log(url)
                        publicacao.url_imagem = url

                        //consulta usuario
                        firebase.database().ref(`usuario_detalhe/${btoa(email)}`)
                        .once('value')
                        .then((snapshot: any) => {
                            //console.log(snapshot.val().nome_usuario, snapshot)
                            publicacao.nome_usuario = snapshot.val().nome_usuario
                        })
                    })
                })
                resolve(publicacoes)
            })
        })
    }
}
