import { http } from "./config"


export default {

    listar:() => {
        return http.get('user')
    },

    salvar:(usuario) => {
        return http.post('user', usuario)
    },

    alterar:(usuarioId, usuario) => {
        return http.put('user/' + usuarioId , usuario)
    },

    deletar:(usuarioId) => {
        return http.delete('user/' + usuarioId)
    }

}