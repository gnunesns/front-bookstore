<template>
  <div class="alugueis">
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
                                        <router-link class="nav-link " to="/about" aria-current="page" href="#">
                                            <v-icon
                                                style="color:#dfdfdf; margin-top: -3px; margin-right: 4px; font-size: 20px"
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
                                        <router-link class="nav-link active" to="/alugueis" href="#"
                                            ><v-icon
                                                style="color:white; margin-top: -3px; margin-right: 4px; font-size: 20px"
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
        <v-col cols="11" style="margin: auto; flex: 1; ">
                <v-data-table
                    :loading="isLoading"
                    :headers="headers"
                    :items="alugueis.content"
                    :items-per-page="5"
                    :search="search"
                    class="elevation-5"
                >
                    <template v-slot:top>
                        <v-toolbar flat color="#212529" class="bg-primary">
                            <v-toolbar-title style="color: white">Lista de Alugueis</v-toolbar-title>

                            <v-divider class="mx-4" inset vertical></v-divider>

                            <v-text-field
                                dark
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details
                            ></v-text-field>
                            <v-spacer></v-spacer>

                            <v-dialog v-model="dialog" max-width="500px">
                                <!-- BOTAO DE CADASTRAR NOVO ALUGUEL -->
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color="#198754"
                                        dark
                                        class="mb-2"
                                        style="margin-top: 9px;"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-plus-lg icone"
                                            style="margin-right: 5px; margin-bottom: 0px"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"
                                            />
                                        </svg>
                                        Novo Aluguel
                                    </v-btn>
                                </template>
                                <!-- CARD FORMULARIO -->
                                <v-card>
                                    <!-- TITULO DO FORMULARIO -->
                                    <v-card-title>
                                        <span class="text-h5">{{ formTitle }}</span>
                                    </v-card-title>
                                     <!-- FORMULARIO -->
                                    <v-card-text>
                                        <v-container>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-select
                                                    v-if="editedIndex == -1"
                                                    v-model="editedItem.usuario"
                                                    :rules="usuarioRules"
                                                    :items="usuarios.content"
                                                    item-text="nome"
                                                    item-value="id"
                                                    append-icon="mdi-account"
                                                    label="Usuario*"
                                                    return-object
                                                    required
                                                    color="#198754"
                                                ></v-select>

                                                <v-select
                                                    v-if="editedIndex == -1"
                                                    v-model="editedItem.livro"
                                                    :rules="livroRules"
                                                    :items="livros.content"
                                                    item-text="nome"
                                                    item-value="id"
                                                    label="Livro*"
                                                    append-icon="mdi-book"
                                                    return-object
                                                    required
                                                    color="#198754"
                                                ></v-select>

                                                <v-menu
                                                    v-if="editedIndex == -1"
                                                    v-model="menu1"
                                                    :close-on-content-click="false"
                                                    :nudge-right="40"
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="290px"
                                                    min-width="auto"
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field
                                                            :value="previsionDateFormatted"
                                                            :rules="dataPrevisaoRules"
                                                            label="Data de previsão*"
                                                            required
                                                            append-icon="mdi-calendar"
                                                            readonly
                                                            id="previsao"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            color="#198754"
                                                        ></v-text-field>
                                                    </template>

                                                    <v-date-picker
                                                        v-model="editedItem.dataPrevisao"
                                                        :min="dataAtual"
                                                        @input="menu1 = false"
                                                        color="#198754"
                                                    ></v-date-picker>
                                                </v-menu>

                                                <v-menu
                                                    v-if="editedIndex != -1"
                                                    v-model="menu2"
                                                    :close-on-content-click="false"
                                                    :nudge-right="40"
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="290px"
                                                    min-width="auto"
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field
                                                            :value="devolutionDateFormatted"
                                                            :rules="dataDevolucaoRules"
                                                            label="Data de devolução*"
                                                            required
                                                            id="devolucao"
                                                            append-icon="mdi-calendar"
                                                            readonly
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            color="#198754"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        :max="dataAtual"
                                                        :min="dataAtual"
                                                        v-model="editedItem.dataDevolucao"
                                                        @input="menu2 = false"
                                                        color="#198754"
                                                    ></v-date-picker>
                                                </v-menu>
                                            </v-form>
                                        </v-container>
                                    </v-card-text>
                                    <!-- BOTAO SALVA/CANCELAR -->
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="red" text @click="close">
                                            Cancelar
                                        </v-btn>
                                        <v-btn color="#198754" text @click="save" :disabled="!valid">
                                            {{ saveEdit }}
                                        </v-btn>
                                    </v-card-actions>

                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>

                    <template v-slot:[`item.status`]="{ item }">
                        <v-chip outlined v-if="item.dataDevolucao == null" color="primary">
                            {{ (item.status = 'Não devolvido') }}
                        </v-chip>
                        <v-chip
                            outlined
                            v-else-if="item.dataDevolucao.valueOf() > item.dataPrevisao.valueOf()"
                            color="red"
                            dark
                        >
                            {{ (item.status = 'Com atraso') }}
                        </v-chip>
                        <v-chip outlined v-else color="#198754" dark>
                            {{ (item.status = 'No prazo') }}
                        </v-chip>
                    </template>

                    <template v-slot:[`item.dataDevolucao`]="{ item }">
                        <div v-if="item.dataDevolucao == null">
                            <v-tooltip v-if="item.dataPrevisao <= dataAtual" top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon class="mr-2" color="#D7CF36" v-bind="attrs" v-on="on">
                                        mdi-alert
                                    </v-icon>
                                </template>
                                <span>Devolução Pendente</span>
                            </v-tooltip>
                        </div>
                        <div v-else>
                            {{ item.dataDevolucao }}
                        </div>
                    </template>

                    <template v-slot:[`item.acoes`]="{ item }">
                        <v-tooltip v-if="item.dataDevolucao == null" top color="red">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon class="mr-2" color="red" @click="deleteItem(item)" v-bind="attrs" v-on="on">
                                    mdi-close-circle-outline
                                </v-icon>
                            </template>
                            <span>Cancelar Aluguel</span>
                        </v-tooltip>
                        <v-tooltip v-if="item.dataDevolucao == null" top color="primary">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon class="mr-2" color="primary" @click="editItem(item)" v-bind="attrs" v-on="on">
                                    mdi-book
                                </v-icon>
                            </template>
                            <span>Devolver</span>
                        </v-tooltip>
                    </template>
   
                </v-data-table>
            </v-col>
        <FooterView/>
    </v-app>
  </div>
</template>

<script>
import Aluguel from '@/services/aluguel';
import Usuario from '@/services/usuarios';
import Livro from   '@/services/livros';
import FooterView from '@/views/FooterView.vue';


export default {
    name: "AluguelComp",
    components: {
        FooterView
    },
    data() {
        return {
            isLoading: true,
            aluguel: {
                id: '',
                livro: {
                    id: '',
                    nome: '',
                    editora: {
                        codigoEditora: '',
                        nome: '',
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
            alugueis: [],
            usuarios: [],
            livros: [],

            valid: true,

            usuarioRules: [v => (v && v.nome != null) || 'Selecione um Usuário!'],
            livroRules: [v => (v && v.nome != null) || 'Selecione um livro!'],
            dataPrevisaoRules: [
                v => !!v || 'Campo data de previsao é obrigatório!',
                v => (v && v >= this.editedItem.dataAluguel) || 'Data de previsão não pode ser menor que a de aluguel!'
            ],
            dataDevolucaoRules: [
                v => !!v || 'Campo data de previsao é obrigatório!',
                v =>
                    (v && v >= this.editedItem.dataAluguel) || 'Data de devolução não pode ser menor que a de aluguel!'
            ],

            dialog: false,
            dialogDelete: false,
            search: '',
            headers: [
                { text: 'Cód.', value: 'id' },
                { text: 'Usuário', value: 'usuario.nome' },
                { text: 'Livro', value: 'livro.nome' },
                { text: 'Data de aluguel', value: 'dataAluguel' },
                { text: 'Data de previsão', value: 'dataPrevisao' },
                { text: 'Data de devolução', value: 'dataDevolucao' },
                { text: 'Status', value: 'status', align: 'center' },
                { text: 'Ações', value: 'acoes', sortable: false, align: 'center' }
            ],
            editedIndex: -1,
            editedItem: {
                id: '',
                livro: {
                    id: '',
                    nome: null,
                    editora: {
                        codigoEditora: '',
                        nome: '',
                        cidade: ''
                    }
                },
                usuario: {
                    id: '',
                    nome: null,
                    endereco: '',
                    cidade: '',
                    email: ''
                },

                dataAluguel: '',
                dataPrevisao: '',
                dataDevolucao: '',
                
            },
            nowDate: new Date().toISOString().slice(0, 10),
            menu1: false,
            menu2: false,
            dataAtual: ''
        };
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
       
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Novo Aluguel' : 'Devolver Livro';
        },
        saveEdit() {
            return this.editedIndex === -1 ? 'Salvar' : 'Devolver';
        },
        devolutionDateFormatted() { 
            if(!this.editedItem.dataDevolucao) return null
            return this.formatDate(this.editedItem.dataDevolucao);
        },
        previsionDateFormatted() { 
            if(!this.editedItem.dataPrevisao) return null
            return this.formatDate(this.editedItem.dataPrevisao);
        }

        
    },

    mounted() {
        this.listar();
        this.pegarDataAtual();
    },

    methods: {

        listar() {
            Aluguel.listar().then(resposta => {
                this.isLoading = false;
                this.alugueis = resposta.data;
            });

            Usuario.listar().then(resposta =>{
                this.usuarios = resposta.data;
            });

            Livro.listar().then(resposta =>{
                this.livros = resposta.data;
            })
        },
       
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
            //this.$refs.form.resetValidation();
        },

        deleteItem(item) {
            this.$swal({
                title: 'Tem certeza?',
                text: 'Este aluguel será cancelado e excluido do sistema!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#198754',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancelar'
            }).then(result => {
                if (result.isConfirmed) {
                    this.editedIndex = this.alugueis.content.indexOf(item);
                    this.editedItem = Object.assign({}, item);

                    Aluguel.deletar(item.id).then(resposta => {
                        this.$swal({
                            text: 'Aluguel cancelado com sucesso.',
                            icon: 'success',
                            confirmButtonColor: '#198754',
                            confirmButtonText: 'Ok'
                        });

                        if (resposta != null) {
                            this.listar();
                        }
                    });
                    this.close();
                }
            });
            this.editedIndex = -1;
        },

        editItem(item) {
            this.editedIndex = this.alugueis.content.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        formatDate(date) {
            const [yyyy, mm, dd] = date.split('-');
            return `${dd}/${mm}/${yyyy}`;
        },

        pegarDataAtual() {
            var data = new Date();
            var dia = String(data.getDate()).padStart(2, '0');
            var mes = String(data.getMonth() + 1).padStart(2, '0');
            var ano = data.getFullYear();
            var dataAtual = ano + '-' + mes + '-' + dia;
            this.dataAtual = dataAtual;
            console.log(dataAtual);
        },

        save() {
            if (this.$refs.form.validate()) {
                if (this.editedIndex > -1) {
                    var edit = {
                        dataDevolucao: this.formatDate(this.editedItem.dataDevolucao)
                    };
                    Aluguel.alterar(this.editedItem.id, edit)
                        .then(resposta => {
                            if (resposta != null) {
                                this.$swal('Livro devolvido com sucesso!', '', 'success');
                                this.listar();
                                this.close();
                            }
                        })
                        .catch(resposta => {
                            this.error = resposta.response.data.error;
                            this.$swal({
                                icon: 'error',
                                text: "Erro! Não foi Possível devolver",
                                confirmButtonColor: '#198754',
                                confirmButtonText: 'Ok'
                            });
                        });
                } else {
                    var save = {
                        usuario: {id:this.editedItem.usuario.id},
                        livro:   {id:this.editedItem.livro.id},
                        dataPrevisao: this.formatDate(this.editedItem.dataPrevisao),   
                    }; 
                    Aluguel.salvar(save)
                        .then(resposta => {  
                            if (resposta != null) {
                                this.$swal('Alugado com sucesso!', '', 'success');
                                this.listar();
                                this.close();
                            }
                        })
                        .catch(resposta => {
                            if (resposta) {
                                this.$swal({
                                    icon: 'error',
                                    text: "Erro! Não foi possível alugar",
                                    confirmButtonColor: '#198754',
                                    confirmButtonText: 'Ok'
                                });
                            }
                        });
                }
            }
        },
        
    }
}
</script>

<style>

</style>