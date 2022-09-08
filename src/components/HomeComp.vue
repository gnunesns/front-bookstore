<template>
    <div class="home">
        <v-app>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary elevation-4">
            <v-col cols="11" style="margin: auto; padding: 7px 0px">
                    <nav class="navbar navbar-expand-lg">
                        <label class="logo">WDA Bookstore</label>
                        <div class="container-fluid">
                            <button
                                class="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                            <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <router-link class="nav-link active" to="/" aria-current="page" href="#">
                                            <v-icon
                                                style="color:white; margin-top: -3px; margin-right: 4px; font-size: 20px"
                                                >mdi-home</v-icon
                                            >Início</router-link
                                        >
                                    </li>
                                    <li class="nav-item">
                                        <router-link class="nav-link" to="/usuarios" href="#"
                                            ><v-icon
                                                style="color:#dfdfdf; margin-top: -3px; margin-right: 4px; font-size: 20px"
                                                >mdi-account-multiple</v-icon
                                            >Usuários</router-link
                                        >
                                    </li>
                                    <li class="nav-item">
                                        <router-link class="nav-link" to="/editoras"
                                            ><v-icon
                                                style="color:#dfdfdf; margin-top: -3px; margin-right: 4px; font-size: 20px"
                                                >mdi-bookshelf</v-icon
                                            >Editoras</router-link
                                        >
                                    </li>
                                    <li class="nav-item">
                                        <router-link class="nav-link" to="/livros" href="#"
                                            ><v-icon
                                                style="color:#dfdfdf; margin-top: -3px; margin-right: 4px; font-size: 20px"
                                                >mdi-book-multiple</v-icon
                                            >Livros</router-link
                                        >
                                    </li>
                                    <li class="nav-item">
                                        <router-link class="nav-link" to="/alugueis" href="#"
                                            ><v-icon
                                                style="color:#dfdfdf; margin-top: -3px; margin-right: 4px; font-size: 20px"
                                                >mdi-calendar-clock</v-icon
                                            >Aluguéis</router-link
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav> 
            </v-col>             
            </nav>
            
            <v-col cols="11" style="margin: auto; flex: 1;">
                <div class="blocos">
                    <v-card class="mt-5 elevation-5 bg-primary" style="width: 49%">
                        <h5 class="h5" style="color:white">
                            <v-icon style="color:white; margin-top: -3px; margin-right: 4px">mdi-account-multiple</v-icon
                            > Último usuário cadastrado
                        </h5>
                        <div v-if="usuarios != 0">
                            <div class="flex" v-for="(usuario, index) in ultimoUsuario" :key="index">
                                <h6 class="h6" style="width: 43%; color:white">
                                    Nome: <span class="corSpan" style="color:white">{{ usuario.nome }}</span>
                                </h6>
                                <h6 class="h6" style="width: 43%; color:white">
                                    Cidade: <span class="corSpan" style="color:white">{{ usuario.cidade }}</span>
                                </h6>
                            </div>
                        </div>
                        <div v-if="usuarios == 0" style="padding: 0px 20px 0px 20px;">
                            <v-alert border="right" colored-border type="error" elevation="2">
                                Nenhum cadastro de usuário encontrado!
                            </v-alert>
                        </div>

                        <v-divider class="h6 mt-5" style="color:black"></v-divider>

                        <h5 class="h5" style="color:white">
                            <v-icon style="color:white; margin-top: -3px; margin-right: 4px">mdi-book</v-icon>
                            Último livro cadastrado
                        </h5>
                        <div v-if="livros != 0">
                            <div class="flex" v-for="(livro, index) in ultimoLivro" :key="index">
                                <h6 class="h6" style="width: 43%; color:white">
                                    Nome: <span class="corSpan" style="color:white">{{ livro.nome }}</span>
                                </h6>
                                <h6 class="h6" style="width: 43%; color:white">
                                    Autor: <span class="corSpan" style="color:white">{{ livro.autor }}</span>
                                </h6>
                            </div>
                        </div>
                        <div v-if="livros == 0" style="padding: 0px 20px 0px 20px;">
                            <v-alert border="right" colored-border type="error" elevation="2">
                                Nenhum cadastro de livro encontrado!
                            </v-alert>
                        </div>
                        <v-divider class="h6 mt-5" style="color:black"></v-divider>

                        <h5 class="h5" style="color:white">
                            <v-icon style="color:white; margin-top: -3px; margin-right: 4px">mdi-bookshelf</v-icon
                            > Última editora cadastrada
                        </h5>
                        <div v-if="editoras != 0">
                            <div class="flex mb-5" v-for="(editora, index) in ultimaEditora" :key="'A' + index">
                                <h6 class="h6" style="width: 43%; color:white">
                                    Nome: <span class="corSpan" style="color:white">{{ editora.nomeEditora }}</span>
                                </h6>
                                <h6 class="h6" style="width: 43%; color:white">
                                    Cidade: <span class="corSpan" style="color:white">{{ editora.cidade }}</span>
                                </h6>
                            </div>
                        </div>
                        <div v-if="editoras == 0" style="padding: 0px 20px 0px 20px;">
                            <v-alert border="right" colored-border type="error" elevation="2">
                                Nenhum cadastro de livro encontrado!
                            </v-alert>
                        </div>
                    </v-card>

                    <v-card class="mt-5 elevation-5 bg-primary" style="width: 49%">
                        <h5 class="h5" style="color:white">
                            <v-icon style="color:white; margin-top: -3px; margin-right: 4px"
                                >mdi-calendar-clock</v-icon
                            > Último aluguel cadastrado
                        </h5>
                        <div v-if="ultimoAluguel != 0">
                            <div class="flex" v-for="(aluguel, index) in ultimoAluguel" :key="'B' + index">
                                <h6 class="h6" style="width: 43%; color:white">
                                    Nome do usuário: <span class="corSpan" style="color:white">{{ aluguel.usuario.nome }}</span>
                                </h6>
                                <h6 class="h6" style="width: 43%; color:white">
                                    Livro alugado: <span class="corSpan" style="color:white">{{ aluguel.livro.nome }}</span>
                                </h6>
                            </div>

                            <div class="flex" v-for="(aluguel, index) in ultimoAluguel" :key="'C' + index">
                                <h6 class="h6" style="width: 43%; color:white">
                                    Data de aluguel: <span class="corSpan" style="color:white">{{ aluguel.dataAluguel }}</span>
                                </h6>
                                <h6 class="h6" style="width: 43%; color:white" v-if="aluguel.dataDevolucao == null">
                                    Data de Devolução: <span class="corSpan" style="width: 43%; color:red">Não devolvido</span>
                                </h6>
                                <div v-else-if="aluguel.dataDevolucao > aluguel.dataPrevisao">
                                    <v-tooltip bottom color="#DB2D2D">
                                        <template v-slot:activator="{ on, attrs }">
                                            <h6 class="h6" style="color:white" v-bind="attrs" v-on="on">
                                                Data de Devolução: {{ aluguel.dataDevolucao }}
                                            </h6>
                                        </template>
                                        <span>Em atraso</span>
                                    </v-tooltip>
                                </div>
                                <div v-else>
                                    <v-tooltip bottom color="#198754">
                                        <template v-slot:activator="{ on, attrs }">
                                            <h6 class="h6" style="color:white" v-bind="attrs" v-on="on">
                                                Data de Devolução: {{ aluguel.dataDevolucao }}
                                            </h6>
                                        </template>
                                        <span>No prazo</span>
                                    </v-tooltip>
                                </div>
                                <div v-if="alugueis == 0" style="padding: 20px;">
                                <v-alert border="right" colored-border type="error" elevation="2">
                                    Nenhum cadastro de aluguel encontrado!
                                </v-alert>
                                </div>
                                  
                        </div>
                        <v-divider class="h6 mt-5" style="color:black"></v-divider>
                        </div>  
                    </v-card>
                </div>

                <div class="blocos mt-5 ">
                    <v-card class="elevation-5" style="width: 100%">
                        <div class="grafico">
                            <h5 class="h5 mt-5" style="text-align: center; color: #0d6efd;">Gráfico - Resumo de aluguéis</h5>
                            <apexchart
                                v-if="!loading"
                                type="donut"
                                width="450"
                                :options="chartOptions"
                                :series="series"
                            ></apexchart>
                        </div>
                    </v-card> 
                </div>

            </v-col>
                   
        <FooterComp/>
        </v-app>
    </div>
  
</template>

<script>
import Livro from '@/services/livros';
import Editora from '@/services/editoras';
import Usuario from '@/services/usuarios';
import Aluguel from '@/services/aluguel';
import FooterComp from './FooterComp.vue';
import apexchart from "vue-apexcharts";


export default {
    components: { 
        FooterComp,
        apexchart
    },

   
    data: () => ({
        aluguel: {
            id: '',
            livro: {
                id: '',
                nome: '',
                editora: {
                    codigoEditora: '',
                    nomeEditora: '',
                    cidade: ''
                }
            },
            usuario: {
                id: '',
                nome: '',
                endereco: '',
                cidade: '',
                email: ''
            },
            dataAluguel: '',
            dataPrevisao: '',
            dataDevolucao: ''
        },
        livros: [],
        usuarios: [],
        editoras: [],
        alugueis: [],
        
        ultimoLivro: [],
        ultimoAluguel: [],
        ultimaEditora: [],
        ultimoUsuario: [], 
         
        series: [0, 0, 0],
        chartOptions: {
            labels: ['Livro em aluguel', 'Entregue com atraso', 'Entregue no prazo'],
            colors: ['#0077FF', '#DB2D2D', '#198754'],
            chart:  { 
                type: 'bar',
                height: '400',
                width: '550' },
        },
        
       
        loading: true,
        

    }),

    

    mounted() {
        this.listar();
    },
 
    methods: {

        listar(){

            Livro.listar().then(resposta => {
                this.livros = resposta.data;
                var ultimoLivro = this.livros.content[this.livros.content.length - 1];
                this.ultimoLivro = [ultimoLivro];
            });

            Usuario.listar().then(resposta => {
                
                this.usuarios = resposta.data;
                var ultimoUsuario = this.usuarios.content[this.usuarios.content.length - 1];
                this.ultimoUsuario.push(ultimoUsuario);
                
            });

            Editora.listar().then(resposta => {
                this.editoras = resposta.data;
                var ultimaEditora = this.editoras.content[this.editoras.content.length - 1];
                this.ultimaEditora = [ultimaEditora];
            });

            Aluguel.listar().then(resposta => {
                this.alugueis = resposta.data;
                var ultAluguel = this.alugueis.content[this.alugueis.content.length - 1];
                if (ultAluguel != null) {
                    this.ultimoAluguel = [ultAluguel];
                }
                this.alugueis.content.forEach(aluguel => {
                    if (aluguel.dataDevolucao == null) {
                        this.series[0]++;
                    } else if (aluguel.dataDevolucao > aluguel.dataPrevisao) {
                        this.series[1]++;
                    } else {
                        this.series[2]++;
                    }
                });
                this.loading = false;
            });

        },

        

    } 

}
</script>

<style>
.carde {
    justify-content: space-between;
    padding: 10px;
}
.flex {
    display: flex;
}

.blocos {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.p {
    font-size: 25px;
    margin-right: 20px;
}

.p-dados {
    font-size: 25px;
    margin-right: 20px;
   
}

.h6 {
    margin-left: 20px;
    margin-right: 20px;
}

.h5 {
    padding: 10px;
    margin-left: 10px;
    margin-right: 10px;
}

.grafico {
    margin: 0 auto;
    width: 370px;
}

.grafico2 {
    margin: 0 auto;
    width: 450px;
}


</style>