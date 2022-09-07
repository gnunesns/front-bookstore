<template>
  <div class="usuarios">
    <v-app >
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
                                        <router-link class="nav-link " to="/" aria-current="page" href="#">
                                            <v-icon
                                                style="color:#dfdfdf; margin-top: -3px; margin-right: 4px; font-size: 20px"
                                                >mdi-home</v-icon
                                            >Início</router-link
                                        >
                                    </li>
                                    <li class="nav-item">
                                        <router-link class="nav-link active" to="/usuarios" href="#"
                                            ><v-icon
                                                style="color:white; margin-top: -3px; margin-right: 4px; font-size: 20px"
                                                >mdi-account-multiple</v-icon
                                            >Usuários</router-link
                                        >
                                    </li>
                                    <li class="nav-item">
                                        <router-link class="nav-link " to="/editoras"
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
                    :items="usuarios.content"
                    :items-per-page="5"
                    :search="search"
                    class="elevation-5"
                >
                <template v-slot:top>
                        <v-toolbar flat class="bg-primary">
                            <v-toolbar-title style="color: white">Lista de Usuários</v-toolbar-title>

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
                                        Novo Usuário
                                    </v-btn>
                                </template>
                                <!--    -->
                                <v-card>

                                    <!-- SALVAR OU EDITAR-->
                                    <v-card-title>
                                        <span class="text-h5">{{ formTitle }}</span>
                                    </v-card-title>

                                    <!-- FORMULARIO DE CADASTRO -->
                                    <v-card-text>
                                        <v-container>
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-text-field
                                                    v-model="editedItem.nome"
                                                    :rules="nameRules"
                                                    :counter="40"
                                                    append-icon="mdi-account"
                                                    label="Nome*"
                                                    required
                                                    color="#198754"
                                                ></v-text-field>

                                                <v-text-field
                                                    v-model="editedItem.endereco"
                                                    :rules="enderecoRules"
                                                    :counter="25"
                                                    append-icon="mdi-map-marker"
                                                    label="Endereço*"
                                                    required
                                                    color="#198754"
                                                ></v-text-field>

                                                <v-text-field
                                                    v-model="editedItem.cidade"
                                                    :rules="cidadeRules"
                                                    :counter="20"
                                                    append-icon="mdi-city"
                                                    label="Cidade*"
                                                    required
                                                    color="#198754"
                                                ></v-text-field>

                                                <v-text-field
                                                    v-model="editedItem.email"
                                                    :rules="emailRules"
                                                    label="Email*"
                                                    append-icon="mdi-email"
                                                    required
                                                    color="#198754"
                                                ></v-text-field>
                                            </v-form>
                                        </v-container>
                                    </v-card-text>
                                    <!--    -->
                                    <!-- BOTAO DE SALVA/CANCELAR -->
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="red" text @click="close">
                                            Cancelar
                                        </v-btn>
                                        <v-btn color="#198754" text @click="save" :disabled="!valid">
                                            {{ saveEdit }}
                                        </v-btn>
                                    </v-card-actions>
                                    <!--    -->
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="dialogDelete" max-width="500px">
                                <v-card>
                                    <v-card-title class="text-h5">Você deseja deletar este usuário?</v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
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
import Usuario from '@/services/usuarios'
import FooterView from '@/views/FooterView.vue';

export default {
    name: "UsuarioComp",
    components: { 
        FooterView
    },

    data() {
        return {  
            isLoading: true,
            usuario: {
                id: '',
                nome: '',
                endereco: '',
                cidade: '',
                email: ''
            },

            usuarios: [],
            

            valid: true,

            nameRules: [
                v => !!v || 'Campo nome é obrigatório!',
                v => (v && v.length <= 30) || 'O nome deve ter no máximo 40 caractéres! ',
                v => (v && v.length >= 3) || 'O nome deve ter no mínimo 3 caractéres! ',
                v => /[a-zA-ZÀ-ú]+$/.test(v) || 'Nome inválido!',
                v => /^[a-zA-ZÀ-ú ]+$/.test(v) || 'Nome inválido!',
                v => /^[^-\s]/.test(v) || 'Informe um nome sem espaçamentos no início!'
            ],
            enderecoRules: [
                v => !!v || 'Campo endereço é obrigatório!',
                v => (v && v.length <= 50) || 'O endereço deve ter no máximo 50 caractéres! ',
                v => (v && v.length >= 3) || 'O endereco deve ter no mínimo 5 caractéres! ',
                v => /^[^-\s]/.test(v) || 'Informe um endereço sem espaçamentos no início!'
            ],
            cidadeRules: [
                v => !!v || 'Campo cidade é obrigatório!',
                v => (v && v.length <= 20) || 'A cidade deve ter no máximo 20 caractéres! ',
                v => (v && v.length >= 3) || 'A cidade deve ter no mínimo 3 caractéres! ',
                v => /[a-zA-ZÀ-ú]+$/.test(v) || 'Cidade inválida!',
                v => /^[a-zA-ZÀ-ú ]+$/.test(v) || 'Cidade inválida!',
                v => /^[^-\s]/.test(v) || 'Informe uma Cidade sem espaçamentos no início!'
            ],
            emailRules: [
                v => !!v || 'Campo e-mail é obrigatório!',
                v => /.+@.+\..+/.test(v) || 'Informe um e-mail válido!',
                v => /^[^-\s]/.test(v) || 'Informe um e-mail sem espaçamentos no início!'
            ],

            dialog: false,
            dialogDelete: false,

            search: '',
            headers: [
                { text: 'Cód', value: 'id' },
                { text: 'Nome', value: 'nome' },
                { text: 'Endereço', value: 'endereco' },
                { text: 'Cidade', value: 'cidade' },
                { text: 'E-mail', value: 'email' },
                { text: 'Ações', value: 'acoes', sortable: false }
            ],

            editedIndex: -1,
            editedItem: {
                id: 0,
                nome: '',
                endereco: '',
                cidade: '',
                email: ''
            }
        }; 
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Novo Usuário' : 'Editar Usuário';
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
            Usuario.listar().then(resposta => {
                console.log(resposta)
                this.isLoading = false;
                this.usuarios = resposta.data;             
            });
        },

        editItem(item) {
            this.editedIndex = this.usuarios.content.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        atualizarform() {
            this.usuario = {};
            this.v$.$reset();
        },

        reset() {
            this.$refs.form.reset();
        },

        deleteItem(item) {
            this.$swal({
                title: 'Tem certeza?',
                text: 'Este usuário será deletado permanentemente!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#198754',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, deletar!',
                cancelButtonText: 'Cancelar!'
            }).then(result => {
                if (result.isConfirmed) {
                    this.editedIndex = this.usuarios.content.indexOf(item);
                    this.editedItem = Object.assign({}, item);

                    
                    Usuario.deletar(item.id)
                        .then(resposta => {
                            this.$swal({
                                title: 'Deletedo!',
                                text: 'Usuario deletado com sucesso.',
                                icon: 'success',
                                confirmButtonColor: '#198754',
                                confirmButtonText: 'Ok'
                            });

                            if (resposta != null) {
                                this.listar();
                            }
                        })
                        .catch(resposta => {
                            var erro = resposta.response.data.error;
                            this.$swal({
                                icon: 'error',
                                text: erro,
                                confirmButtonColor: '#198754',
                                confirmButtonText: 'Ok'
                            });
                        });
                    this.reset();
                }
            });
            this.editedIndex = -1;
        },

        deleteItemConfirm() {
            this.usuarios.splice(this.editedIndex, 1);
            this.closeDelete();
        },

        close() {
            this.dialog = false;          
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
            this.$refs.form.resetValidation();
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.$refs.form.validate()) {
                if (this.editedIndex > -1) {
                    var edit = {
                        nome: this.editedItem.nome,
                        endereco: this.editedItem.endereco,
                        cidade: this.editedItem.cidade,
                        email: this.editedItem.email
                    };
                    Usuario.alterar(this.editedItem.id, edit)
                        .then(resposta => {
                            if (resposta != null) {
                                this.$swal('Usuário alterado com sucesso!', '', 'success');
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
                        nome: this.editedItem.nome,
                        endereco: this.editedItem.endereco,
                        cidade: this.editedItem.cidade,
                        email: this.editedItem.email
                    };
                    Usuario.salvar(save)
                        .then(resposta => {
                            if (resposta != null) {
                                this.$swal('Usuário salvo com sucesso!', '', 'success');
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