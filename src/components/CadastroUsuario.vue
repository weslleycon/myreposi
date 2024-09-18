<template>

    <Button label=" Não tenho login" @click="visible = true" />
    <Dialog v-model:visible="visible" modal style="width: 80%; display: flex;
justify-content: center;
align-items: center;
height: 20rem;
background-color: white;" :pt="{

        mask: {

        }
    }" class="center-dialog">
        <template #container="">

            <div class="inline-flex flex-column gap-2">
                <div class="cadastro-componente-1">
                    <div class="componente-cadastro-1">
                        <!-- <label for="nome-produto" class="campo-label">Nome</label> -->
                        <InputText v-model="usuario.nome" type="text" placeholder="Nome" class="input-cadastros" />
                    </div>
                    <div class="componente-cadastro-2">
                        <!-- <label for="" class="campo-label">Idade</label> -->
                        <input type="number" v-model="usuario.idade" invalid mode="decimal" :min="0"
                            class="input-cadastros" placeholder="Idade" />
                    </div>
                    <div class="componente-cadastro-3">

                        <InputMask id="phone" v-model="usuario.telefone" mask="(99) 99999-9999"
                            placeholder="(99) 99999-9999" class="input-cadastros" />
                    </div>

                </div>
                <div class="cadastro-componente-2">

                    <div class="componente-cadastro-1">
                        <InputText v-model="usuario.email" type="text" class="input-cadastros" placeholder="Email" />
                    </div>
                    <div class="componente-cadastro-1">
                        <InputText v-model="usuario.user.login" placeholder="Login" class="input-cadastros" />
                    </div>
                    <div class="componente-cadastro-2">

                        <input type="password" v-model="usuario.user.senha" placeholder="Senha"
                            class="input-cadastros" />
                    </div>

                </div>

                <div class="flex align-items-center gap-3 botoes">
                    <Button label="Cancelar" @click="cancelarCadastro()" text
                        class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10 cancelar"></Button>

                    <Button label="Salvar" @click="salvarUsuario()" text :disabled="!camposPreenchidos()"
                        class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10 enviar"></Button>
                </div>
            </div>

        </template>
    </Dialog>
</template>
<script lang="ts">
import { Cadastrousuario, obterLogin } from '@/http';
import type ListarUsuario from '@/interface/ListarUsuario';
import Dialog from 'primevue/dialog';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        Dialog
    },
    data() {
        return {
            visible: false,
            usuario: {
                nome: '',
                idade: '',
                email: '',
                telefone: '',
                user: {
                    login: '',
                    senha: ''
                }
            },
            emailValido: false,
            usuarios: [] as ListarUsuario[]
        }
    },
    methods: {
        async salvarUsuario() {


            try {
                if (!this.validarEmail(this.usuario.email)) {
                    alert('Por favor, insira um e-mail válido.');
                    return;
                }
                const cadastro = await Cadastrousuario(this.usuario)
                this.usuario.email = '';
                this.usuario.idade = '';
                this.usuario.telefone = '';
                this.usuario.nome = '';
                this.usuario.user.login = '';
                this.usuario.user.senha = '';
                this.visible = false;
                alert('Usuario cadastrado!')
            } catch {
                alert("Login ja em uso")
            }
        },
        cancelarCadastro() {

            this.usuario.email = '';
            this.usuario.idade = '';
            this.usuario.telefone = '';
            this.usuario.nome = '';
            this.usuario.user.login = '';
            this.usuario.user.senha = '';
            this.visible = false;
        },
        camposPreenchidos() {

            return this.usuario.email && this.usuario.idade && this.usuario.telefone &&
                this.usuario.nome && this.usuario.user.login && this.usuario.user.senha;


        },
        validarEmail(email: string) {
            // Expressão regular para validar o formato do e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },


    }
})
</script>
<style scoped>
.tela-cadastro {
    align-items: center;
    padding: 10% 10%;
    display: flex;
    justify-content: center;
}

.cadastro {

    background-color: aqua;
    text-align: center;
    width: 56rem;
    height: 24rem;
    background-color: white;
    border-radius: 21px;
    box-shadow: 0px 4px 9px black;

}

.componentes-cadastro {
    display: flex;
    align-items: center;

}

.titulo-login {
    background-color: black;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    color: white;
}

.formulario {

    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 50%;
    justify-content: center;
    height: 10rem;
    margin-top: 20px;
    align-items: center;
}

.input-cadastro {
    box-shadow: 0px 6px 9px #5CB9EE;
    border-radius: 6px;
    height: 3rem;
    width: 70%;
}

.input-cadastros {
    box-shadow: 0px 6px 9px #5CB9EE;
    border-radius: 6px;
    height: 2rem;
    width: 90%;
    padding: 0 4px;
    background-color: white;
    outline: none;
}

.cadastro-componente-1,
.cadastro-componente-2,
.cadastro-componente-3 {
    display: flex;
    margin-bottom: 40px;
    width: 100%;
    gap: 10px;
    padding: 0px 10px;

}

.componente-cadastro-1,
.componente-cadastro-2,
.componente-cadastro-3 {
    display: flex;
    gap: 10px;
}

.separador {
    background-color: black;
    display: inline-block;
    height: 21rem;
    margin: 0px 1px 0px;
    width: 1px;
    vertical-align: middle;
}

.foto-login {
    width: 40%;
    height: 0%;
}

.botoes {
    display: flex;
    gap: 64%;
}

.enviar {
    background-color: white;
    width: 100px;
    color: black;
    height: 2rem;
    border: 2px solid black;
    border-radius: 8px;
}

.cancelar {
    background-color: white;
    width: 100px;
    color: red;
    height: 2rem;
    border: 2px solid black;
    border-radius: 8px;
}

.enviar:hover {
    background-color: #5CB9EE;
    color: white;
}

.cancelar:hover {
    background-color: red;
    color: white;
}

@media screen and (max-width: 576px) {

    .cadastro-componente-1,
    .cadastro-componente-2 {
        flex-direction: column;
        margin-bottom: 10px;
    }

    .enviar,
    .cancelar {
        width: 80px;
    }

    .botoes {
        gap: 16%;
    }
}
</style>