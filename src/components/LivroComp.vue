<template>
  <div class="livros">
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
                                        <router-link class="nav-link active" to="/livros" href="#"
                                            ><v-icon
                                                style="color:white; margin-top: -3px; margin-right: 4px; font-size: 20px"
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
        <v-col cols="11" style="margin: auto; flex: 1">
                <v-data-table
                    :loading="isLoading"
                    :headers="headers"
                    :items="livros"
                    :items-per-page="5"
                    :search="search"
                    class="elevation-5"
                >
                    <template v-slot:top>
                        <v-toolbar flat color="#212529" class="bg-primary">
                            <v-toolbar-title style="color: white">Lista de Livros</v-toolbar-title>

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
                                
                                <!-- BOTAO DE CADASTRAR NOVO LIVRO -->
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
                                        Novo Livro
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
                                                    v-model="editedItem.nome"
                                                    :rules="nameRules"
                                                    :counter="30"
                                                    append-icon="mdi-book"
                                                    label="Nome*"
                                                    required
                                                    color="#198754"
                                                ></v-text-field>

                                                <v-select
                                                    v-model="editedItem.editora"
                                                    :rules="editoraRules"
                                                    :items="editoras"
                                                    item-text="nome"
                                                    item-value="id"
                                                    label="Editora*"
                                                    return-object
                                                    append-icon="mdi-bookshelf"
                                                    required
                                                    color="#198754"
                                                ></v-select>

                                                <v-text-field
                                                    v-model="editedItem.autor"
                                                    :rules="autorRules"
                                                    :counter="20"
                                                    label="Autor*"
                                                    append-icon="mdi-account"
                                                    required
                                                    color="#198754"
                                                ></v-text-field>

                                                <v-text-field
                                                    v-model="editedItem.lancamento"
                                                    :rules="lancamentoRules"
                                                    :counter="4"
                                                    label="Ano de lançamento*"
                                                    append-icon="mdi-calendar"
                                                    required
                                                    color="#198754"
                                                ></v-text-field>

                                                <v-text-field
                                                    v-model="editedItem.quantidade"
                                                    :rules="quantidadeRules"
                                                    append-icon="mdi-numeric"
                                                    label="Quantidade*"
                                                    type="number"
                                                    onkeypress="return event,charCode > 48"
                                                    min="1"
                                                    required
                                                    color="#198754"
                                                    v-if="editedIndex == -1"
                                                ></v-text-field>

                                                <v-text-field
                                                    v-model="editedItem.quantidade"
                                                    :rules="quantidadeeditRules"
                                                    append-icon="mdi-numeric"
                                                    label="Quantidade*"
                                                    type="number"
                                                    onkeypress="return event,charCode > 48"
                                                    min="0"
                                                    color="#198754"
                                                    v-if="editedIndex != -1"
                                                ></v-text-field>
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
                                    <!--   -->

                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    
                </v-data-table>
            </v-col>
        <FooterView/>
    </v-app>
  </div>
</template>

<script>
import FooterView from '@/views/FooterView.vue';
export default {
    name: "LivroComp",
    components: { 
        FooterView
    },
    data() {
        return {
            isLoading: true,
            livro: {
                id: '',
                nome: '',
                editora: {
                    id: '',
                    nome: '',
                    cidade: ''
                },
                autor: '',
                lancamento: '',
                quantidade: ''
            },
            livros: [],
            editoras: [],
            disponiveis: [],

            valid: true,
            ano: 0,

            nameRules: [
                v => !!v || 'Campo nome é obrigatório!',
                v => (v && v.length <= 30) || 'O nome deve ter no máximo 30 caractéres! ',
                v => (v && v.length >= 3) || 'O nome deve ter no mínimo 3 caractéres! ',
                v => /[a-zA-ZÀ-ú]+$/.test(v) || 'Nome inválido!',
                v => /^[a-zA-ZÀ-ú ]+$/.test(v) || 'Nome inválido!',
                v => /^[^-\s]/.test(v) || 'Informe um nome sem espaçamentos no início!'
            ],
            autorRules: [
                v => !!v || 'Campo autor é obrigatório!',
                v => (v && v.length <= 30) || 'O autor deve ter no máximo 30 caractéres! ',
                v => (v && v.length >= 3) || 'O autor deve ter no mínimo 3 caractéres! ',
                v => /[a-zA-ZÀ-ú]+$/.test(v) || 'Autor inválido!',
                v => /^[a-zA-ZÀ-ú ]+$/.test(v) || 'Autor inválido!',
                v => /^[^-\s]/.test(v) || 'Informe um autor sem espaçamentos no início!'
            ],
            lancamentoRules: [
                v => !!v || 'Campo lançamento é obrigatório! ',
                v => (v && v >= 1000) || 'O ano deve conter 4 digitos! ',
                v => (v && v <= this.ano) || 'O ano de lançamento não pode ser maior que o ano atual -- ' + this.ano
            ],

            quantidadeRules: [
                v => !!v || 'Campo quantidade é obrigatório!',
                v => (v && v >= 1) || 'A quantidade não pode ser menor que 1! ',
                v => (v && !isNaN(v)) || 'Informe um valor válido'
            ],

            editoraRules: [v => (v && v.nome != null) || 'Escolha uma editora'],

            dialog: false,
            dialogDelete: false,
            search: '',
            headers: [
                { text: 'Cód.', value: 'id' },
                { text: 'Nome', value: 'nome' },
                { text: 'Editora', value: 'editora.nome' },
                { text: 'Autor', value: 'autor' },
                { text: 'Lançamento', value: 'lancamento' },
                { text: 'Qtd.Disponível', value: 'quantidade' },
                { text: 'Ações', value: 'acoes', sortable: false }
            ],
            editedIndex: -1,
            editedItem: {
                id: '',
                nome: '',
                editora: {
                    id: '',
                    nome: null,
                    cidade: ''
                },
                autor: '',
                lancamento: '',
                quantidade: '',
                totalalugado: ''
            }
        };
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Novo Livro' : 'Editar Livro';
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

    methods: {
        close() {
            this.dialog = false;

            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
            this.$refs.form.resetValidation();
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