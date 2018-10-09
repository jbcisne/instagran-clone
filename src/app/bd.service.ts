import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {

    constructor(
        private progresso: Progresso
    ){}

    public publicar(publicacao: any): void {

        console.log(publicacao)

        let nomeImagem = Date.now()

        firebase.storage().ref()
            .child(`images/${nomeImagem}`)
            .put(publicacao.imagem)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                //acompanhamento do progresso do upload
                (snapshot: any) => {
                    this.progresso.status = 'Em andamento'
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
        /*
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        .push({
            titulo: publicacao.titulo
        })
        */
        console.log('chegamos no serviço Bd')
    }
}