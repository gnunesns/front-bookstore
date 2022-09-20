import { http } from "./config";

export default{

    listar:(pagination) => {
        const {pageNumber, pageSize} = pagination;
        return http.get(`renting?page=${pageNumber}&size=${pageSize}`);
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