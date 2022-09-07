import { http } from "./config";

export default{

    listar:() => {
        return http.get('renting');
    },

    salvar:(aluguel) => {
        return http.post('renting', aluguel)
    },

    alterar:(aluguelId, aluguel) => {
        return http.put('renting/' + aluguelId , aluguel)
    },

    deletar:(aluguelId) => {
        return http.delete('renting/' + aluguelId)
    }
}