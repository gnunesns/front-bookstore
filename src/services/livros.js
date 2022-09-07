import { http } from "./config";

export default {

    listar:() =>{
        return http.get('books')
    },

    salvar:(livro) =>{
        return http.post('books', livro)
    },

    alterar:(livroId, livro) =>{
        return http.put('books/' + livroId, livro)
    },

    deletar:(livroId, livro) =>{
        return http.delete('books/' + livroId, livro)
    },

    maisAlugado: () =>{
        return http.get('orderly')
    }
}