import { http } from "./config";

export default {

    listar:() =>{
        return http.get('publisher')
    },

    salvar:(editora) =>{
        return http.post('publisher', editora)
    },

    alterar:(editoraId, editora) =>{
        return http.put('publisher/' + editoraId, editora )
    },

    deletar:(editoraId, editora) =>{
        return http.delete('publisher/' + editoraId, editora)
    }



}