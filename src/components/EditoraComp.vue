<template>
  <div class="editoras">
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
                                        <router-link class="nav-link active" to="/editoras"
                                            ><v-icon
                                                style="color:white; margin-top: -3px; margin-right: 4px; font-size: 20px"
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
                                        <router-link class="nav-link " to="/alugueis" href="#"
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
                <v-data-table
                    :loading="isLoading"
                     style="flex-grow: 1;"
                    :headers="headers"
                    :items="editoras.content"
                    :items-per-page="5"
                    :search="search"
                    class="elevation-5"
                >
                <template v-slot:top>
                        <v-toolbar flat color="#212529" class="bg-primary">
                            <v-toolbar-title style="color: white">Lista de Editoras</v-toolbar-title>

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

                                <!-- BOTAO DE CADASTRAR NOVO USUARIO -->
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
                                        Nova Editora
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
                                                <v-text-field
                                                    v-model="editedItem.nomeEditora"
                                                    :rules="nameRules"
                                                    append-icon="mdi-bookshelf"
                                                    :counter="80"
                                                    label="Nome*"
                                                    required
                                                    color="#198754"
                                                ></v-text-field>

                                                <v-text-field
                                                    v-model="editedItem.cidade"
                                                    :rules="cidadeRules"
                                                    :counter="50"
                                                    append-icon="mdi-city"
                                                    label="Cidade*"
                                                    required
                                                    color="#198754"
                                                ></v-text-field>
                                            </v-form>
                                        </v-container>
                                        <!--   -->
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
                                    <!--   -->

                                </v-card>
                            </v-dialog>
                            
                        </v-toolbar>
                </template>
                <template v-slot:[`item.acoes`]="{ item }">
                        <v-tooltip top color="#0077FF">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon class="mr-2" color="#0077FF" @click="editItem(item)" v-bind="attrs" v-on="on">
                                    mdi-pencil
                                </v-icon>
                            </template>
                            <span>Alterar</span>
                        </v-tooltip>
                        <v-tooltip top color="red">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon class="mr-2" color="red" @click="deleteItem(item)" v-bind="attrs" v-on="on">
                                    mdi-delete
                                </v-icon>
                            </template>
                            <span>Deletar</span>
                        </v-tooltip>
                    </template>


                </v-data-table>
            </v-col>
        <FooterView/>
    </v-app>
  </div>
</template>

<script>
import Editora from '@/services/editoras';
import FooterView from '@/views/FooterView.vue';

export default {
    name: "EditoraComp",
    components: { 
        FooterView 
    },
    data() {
        return {
            isLoading: true,
            error: '',
            editora: {
                codigoEditora: '',
                nomeEditora: '',
                cidade: ''
            },
            editoras: [],

            valid: true,

            nameRules: [
                v => !!v || 'Campo nome é obrigatório!',
                v => (v && v.length <= 30) || 'O nome deve ter no máximo 30 caractéres! ',
                v => (v && v.length >= 3) || 'O nome deve ter no mínimo 3 caractéres! ',
                v => /[a-zA-ZÀ-ú]+$/.test(v) || 'Nome inválido!',
                v => /^[a-zA-ZÀ-ú ]+$/.test(v) || 'Nome inválido!',
                v => /^[^-\s]/.test(v) || 'Informe um nome sem espaçamentos no início!'
            ],
            cidadeRules: [
                v => !!v || 'Campo cidade é obrigatório!',
                v => (v && v.length <= 20) || 'A cidade deve ter no máximo 20 caractéres! ',
                v => (v && v.length >= 3) || 'A cidade deve ter no mínimo 3 caractéres! ',
                v => /[a-zA-ZÀ-ú]+$/.test(v) || 'Cidade inválida!',
                v => /^[a-zA-ZÀ-ú ]+$/.test(v) || 'Cidade inválida!',
                v => /^[^-\s]/.test(v) || 'Informe uma cidade sem espaçamentos no início!'
            ],

            dialog: false,
            dialogDelete: false,
            search: '',
            headers: [
                { text: 'Cód', value: 'codigoEditora' },
                { text: 'Nome', value: 'nomeEditora' },
                { text: 'Cidade', value: 'cidade' },
                { text: 'Ações', value: 'acoes', sortable: false }
            ],
            editedIndex: -1,
            editedItem: {
                codigoEditora: 0,
                nomeEditora: '',
                cidade: ''
            }
        };
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Nova Editora' : 'Editar Editora';
        },
        saveEdit() {
            return this.editedIndex === -1 ? 'Salvar' : 'Editar';
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        }
    },

    mounted(){
        this.listar();
    },

    methods: {

        listar() {
            Editora.listar().then(resposta => {
                console.log(resposta);
                this.isLoading = false;
                this.editoras = resposta.data;
            });
        },

        atualizarform() {
            this.editora = {};
            this.v$.$reset();
        },

        editItem(item) {
            this.editedIndex = this.editoras.content.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.$swal({
                title: 'Tem certeza?',
                text: 'Esta editora será deletada permanentemente!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#198754',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, deletar!',
                cancelButtonText: 'Cancelar'
            }).then(result => {
                if (result.isConfirmed) {
                    this.editedIndex = this.editoras.content.indexOf(item);
                    this.editedItem = Object.assign({}, item);

                    
                    Editora.deletar(item.codigoEditora)
                        .then(resposta => {
                            this.$swal({
                                title: 'Deleteda!',
                                text: 'Editora deletada com sucesso.',
                                icon: 'success',
                                confirmButtonColor: '#198754',
                                confirmButtonText: 'Ok'
                            });

                            if (resposta != null) {
                                this.listar();
                            }
                        })
                        .catch(resposta => {
                            if (resposta) {
                                var erro = resposta.response.data.error;
                                this.$swal({
                                    icon: 'error',
                                    text: erro,
                                    confirmButtonColor: '#198754',
                                    confirmButtonText: 'Ok'
                                });
                            }
                        });
                    this.reset();
                }
                this.editedIndex = -1;
            });
        },

        deleteItemConfirm() {
            this.editoras.splice(this.editedIndex, 1);
        },

        closeDelete() {
            this.editedIndex = -1;
        },

        reset() {
            this.$refs.form.reset();
        },
        
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
            this.$refs.form.resetValidation();
        },

        save() {
            if (this.$refs.form.validate()) {
                if (this.editedIndex > -1) {
                    var edit = {
                        nomeEditora: this.editedItem.nomeEditora,
                        cidade: this.editedItem.cidade
                    };
                    Editora.alterar(this.editedItem.codigoEditora, edit)
                        .then(resposta => {
                            if (resposta != null) {
                                this.$swal('Editora alterada com sucesso!', '', 'success');
                                this.listar();
                                this.close();
                            }
                        })
                        .catch(resposta => {
                            this.error = resposta.response.data.error;
                            this.$swal({
                                icon: 'error',
                                text: "Erro! Não foi Possível atualizar",
                                confirmButtonColor: '#198754',
                                confirmButtonText: 'Ok'
                            });
                        });
                } else {
                    var save = {
                        nomeEditora: this.editedItem.nomeEditora,
                        cidade: this.editedItem.cidade
                    };
                    Editora.salvar(save)
                        .then(resposta => {
                            if (resposta != null) {
                                this.$swal('Editora salva com sucesso!', '', 'success');
                                this.listar();
                                this.close();
                            }
                        })
                        .catch(resposta => {
                            this.error = resposta.response.data.error;
                            this.$swal({
                                icon: 'error',
                                text: "Erro! Não foi Possível salvar",
                                confirmButtonColor: '#198754',
                                confirmButtonText: 'Ok'
                            });
                        });
                }
            }
        },
    }
}
</script>

<style>
html, body {
    height: 100%;
    font-weight: 500; 
}
label.logo {
    color: white;
    font-size: 20px;
    padding: 0 116px;
    font-weight: bold;
    
}
#editoras {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.conteudo {
    flex-grow: 1;
}

.icone-menu {
    margin-top: -5px;
    margin-right: 3px;
}

.navbar {
    padding: 5px;
}
</style>