<template>
    <div class="card flex justify-content-center" style=" height: 3rem; width: 18%;
    width: 50%;
    height: 3rem;
    display: flex;
    justify-content: center;">
        <Button label=" Cadastrar" @click="visible = true" class="cadastro" />

        <Dialog v-model:visible="visible" modal style="width: 50%; display: flex;
        justify-content: center;
        align-items: center;
        padding:2% 0%;" :pt="{

            mask: {

            }
        }" class="center-dialog">
            <template #container="">

                <div class="inline-flex flex-column gap-2">
                    <div class="cadastro-componente-1">
                        <div class="componente-cadastro-1">
                            <label for="nome-produto" class="campo-label">Nome do produto <i class="pi pi-pencil"
                                    style="font-size: 1rem"></i></label>
                            <input type="text" v-model="racao.nome" placeholder="Nome"
                                class="input-componente form-control" :class="{ 'input-vazio': !racao.nome }" />
                        </div>
                        <div class="componente-cadastro-2">
                            <label for="" class="campo-label">Quantidade (kg)</label>
                            <input type="number" mode="decimal" v-model="racao.kgQuantidade" invalid :min="0"
                                class="input-componente form-control" :class="{ 'input-vazio': !racao.kgQuantidade }" />


                        </div>
                    </div>
                    <div class="cadastro-componente-2">
                        <div class="componente-cadastro-2">

                            <label for="valor-pago" class="campo-label">Valor <i class="pi pi-dollar"
                                    style="font-size: 1rem"></i></label>


                            <InputNumber v-model="racao.valorPago" mode="currency" currency="BRL" locale="pt-BR"
                                :min="0" :minFractionDigits="2" class="input-componente-valor-pago"
                                :class="{ 'input-vazio': !racao.valorPago }" />


                        </div>
                        <div class="componente-cadastro-data ">
                            <label for="Data" class="campo-label">Data Compra <i class="pi pi-calendar"
                                    style="font-size: 1rem"></i></label>

                            <InputMask v-model="racao.dataCompra" placeholder="dd/mm/aaaa" mask="99/99/9999"
                                class="input-componente form-control" date-format="dd/mm/yy"
                                :class="{ 'input-vazio': !racao.valorPago }" />

                        </div>
                    </div>


                    <div class="flex align-items-center gap-3 botoes">
                        <Button label="Cancelar" @click="cancelar" text
                            class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10 cancelar"></Button>
                        <Button label="Salvar" @click="salvarRacao" text
                            class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10 enviar"></Button>
                    </div>
                </div>

            </template>
        </Dialog>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Calendar from 'primevue/calendar';
import { cadastroRacao } from '@/http';
import Rodape from './Rodape.vue';
export default defineComponent({
    components: {


    },

    data() {


        return {
            visible: false,
            racao: {
                nome: '',
                kgQuantidade: 0,
                valorPago: 0,
                dataCompra: '',

            },
            maxDate: new Date()
        };
    },
    methods: {
        async salvarRacao() {


            let mensagem = '';
            switch (true) {
                case !this.camposPreenchidos():
                    mensagem = 'Por favor, preencha todos os campos obrigatórios'
                    break;



                default: {
                    try {
                        const salvar = await cadastroRacao(this.racao)

                        this.visible = false;
                        this.racao.nome = '',
                            this.racao.dataCompra = '',
                            this.racao.kgQuantidade = 0,
                            this.racao.valorPago = 0
                        mensagem = 'Ração salva!'
                        window.location.reload()
                    }
                    catch (error) {
                        mensagem = 'Ocorreu um erro ao salvar o seu produto, verifique se os campos estão preenchidos corretamente'
                    }

                }

            }
            console.log(this.racao.dataCompra);
            alert(mensagem)
        },
        cancelar() {
            this.racao.nome = '',
                this.racao.dataCompra = '',
                this.racao.kgQuantidade = 0,
                this.racao.valorPago = 0
            this.visible = false;

        },
        camposPreenchidos() {
            return this.racao.nome && this.racao.kgQuantidade && this.racao.valorPago && this.racao.dataCompra;
        },


    },
});
</script>
<style scoped>
.center-dialog {
    width: 90%;
    max-width: 600px;
    /* Defina a largura máxima desejada */
}
.input-componente-valor-pago{
    height: 2.5rem;
    box-shadow: 0px 6px 9px #5CB9EE;
    border-radius: 2px;
    width: 90%;
}

.botoes {
    display: flex;
 
}

.input-vazio {
    border: 2px solid red;
}

.input{
    height: 2.5rem;
}

.input-componente {
    box-shadow: 0px 6px 9px #5CB9EE;
    border-radius: 2px;



}

.cadastro {
    background-color: white;
    width: 100%;
    height: 3rem;
}

.cadastro:hover {
    background-color: #5CB9EE;
    color: white;
}



.campo-label {
    color: black;
}

.cadastro-racao {

    height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cancelar-salvar {
    display: flex;
    justify-content: center;
    gap: 50%;
}

.formulario {

    height: 7rem;
    gap: 10px;
    align-items: center;
    justify-content: center;

    padding: 4px;

}

.enviar {
    background-color: white;
    width: 100px;
    color: black;
    height: 2rem;
    border: 2px solid white;
    border-radius: 8px;
}

.cancelar {
    background-color: white;
    width: 100px;
    color: red;
    height: 2rem;
    border: 2px solid white;
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

.componente-cadastro-1 {
    display: flex;
    flex-direction: column;
    width: 50%;
    align-items: center;
    background-color: white;
    box-shadow: 0px 4px 7px black;
    height: 6rem;
    justify-content: center;
    gap: 10px;
}

.componente-cadastro-2 {
    display: flex;
    flex-direction: column;
    width: 50%;
    align-items: center;
    background-color: white;
    box-shadow: 0px 4px 7px black;
    height: 6rem;
    justify-content: center;
    gap: 10px;
}



.componente-cadastro-data {
    width: 50%;
    background-color: white;
    box-shadow: 0px 4px 7px black;
    height: 6rem;
    gap: 10px;
    text-align: center;
    padding: 27px 0px;
}

.cadastro-componente-1 {

    display: flex;
    gap: 40px;
    margin-bottom: 30px;
    width: 500px;
}

.cadastro-componente-2 {
    width: 500px;
    display: flex;
    gap: 40px;
    margin-bottom: 16%;
}

@media screen and (max-width: 767px) {


    flex-column {
        flex-direction: column;
    }

    .px-5,
    .py-5 {
        padding: 12px;
    }

    .gap-4 {
        gap: 12px;
    }

    .width-50 {
        width: 100%;

    }
}

.cadastro-componente-1,
.cadastro-componente-2 {
    width: 120%;

}

.componente-cadastro-1,
.componente-cadastro-2 {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 44%;
}

.componente-cadastro-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: 44%;
}

.campo-label {
    font-weight: bold;
}

.input-componente {
    width: 90%;

}

@media screen and (max-width: 500px) {

    .cadastro-componente-1,
    .cadastro-componente-2 {
        width: 120%;
        display: flex;
        flex-direction: column;

    }

    .componente-cadastro-1,
    .componente-cadastro-2 {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
    }

    .componente-cadastro-data {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
    }
}
</style>