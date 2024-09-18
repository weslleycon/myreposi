<template>
    <div class="lista">
      <div v-if="item.length === 0" class="lista-vazia">
        <h2 class="titulo-lista-vazia">
          Você ainda não tem nenhuma ração cadastrada!
        </h2>
      </div>
      <div v-else class="card p-fluid tabela">
        <DataTable v-model:editingRows="editingRows" paginator :rows="10" :value="item" editMode="row" dataKey="id"
          @row-edit-save="onRowEditSave" style="padding: 10px 20px; overflow-x: auto;">
          <Column field="nome" sortable header="Nome" style="width: 20%; min-width: 100px;">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
          </Column>
          <Column field="kgQuantidade" sortable header="Quantidade (kg)" style="width: 20%; min-width: 100px;">
            <template #editor="{ data, field }">
              <InputNumber v-model="data[field]" optionLabel="label" optionValue="value" />
            </template>
          </Column>
          <Column field="valorPago" sortable header="Valor R$" style="width: 20%; min-width: 100px;">
            <template #editor="{ data, field }">
              <InputNumber v-model="data[field]" mode="currency" currency="BRL" locale="pt-BR" />
            </template>
          </Column>
          <Column field="dataCompra" sortable header="Data" style="min-width: 200px" :body="formatDateColumn">
            <template #editor="{ data, field }">
              <InputMask id="basic" v-model="data[field]" placeholder="99/99/9999" mask="99/99/9999"
                slotChar="dd/mm/yyyy" />
            </template>
          </Column>
          <Column header="Atualizar" :rowEditor="true"
            style="width: 10%; text-align: center; display:flex; min-width: 8rem;" bodyStyle="text-align: center;">
          </Column>
          <Column header="Excluir" style="min-width: 20%; ">
            <template #body="{ data }">
              <div class="card flex justify-content-center">
                <Button @click="abrirDialog(data)"><i class="pi pi-trash"></i></Button>
                <Dialog v-model:visible="visible" modal header="Tem certeza que deseja excluir o item ?"
                  class="dialog-cancelar" :style="{ width: '30rem;', height: '10rem;', color: 'red' }">
                  <div class="flex justify-content-end gap-2 cancela-item">
                    <div class="excluir">
                      <Button @click="cancelarDelete" class="excluir ">Excluir</Button>
                    </div>
                    <Button type="button" label="Cancelar" @click="cancelDelete" class="cancelar"></Button>
                  </div>
                </Dialog>
              </div>
            </template>
          </Column>
        </DataTable>
        <p class="valor-gasto">Valor gasto: R$ {{ valorTotal }}</p>
      </div>
      <div class="cards-lista row">
        <div v-for="itens in item" :key="itens.id" class="card col-md-6 mb-3">
          <div class="card-header">
      
            <h3 v-if="!itens.update">{{ itens.nome }}</h3>
            <InputText v-else v-model="itens.nome" :disabled="!itens.update"
              />
      
          </div>
          <div class="card-body">
            <div class="campo-quantidade" :class="{'campos-habilitados': itens.update}" >
              
              <p>Quantidade (kg):</p>
              <p v-if="!itens.update">{{ itens.kgQuantidade }}</p>
              <InputNumber v-else v-model="itens.kgQuantidade" optionlabel="label" :disabled="!itens.update"
                optionValue="value" />
            </div>
            <div class="campo-valor" :class="{'campos-habilitados': itens.update}" >
              <p> Valor:</p>
              <p v-if="!itens.update">{{ itens.valorPago }}</p>
              <InputNumber v-else v-model="itens.valorPago" optionlabel="label" :disabled="!itens.update"
                optionValue="value" />
            </div>
            <div class="campo-data" :class="{'campos-habilitados': itens.update}">
              <p> Data: </p>
              <p v-if="!itens.update">{{ itens.dataCompra }} </p>
              <InputMask v-else v-model="itens.dataCompra" placeholder="dd/mm/aaaa" mask="99/99/9999"
                :disabled="!itens.update" slotChar="dd/mm/yyyy"/>
            </div>
          </div>
          <div class="card-footer">
            <div v-if="itens.update === true">
              <Button @click="atualizar(itens)" class="enviar" :disabled="!camposPreenchidos(itens)" >Salvar</Button>
            </div>
            <div v-else>
              <Button @click="liberarUpdate(itens)" class="enviar">Atualizar</Button>
            </div>
            <Button v-if="itens.update" @click="cancelar(itens)" class="excluir">Cancelar</Button>
            <Button v-else @click="abrirDialog(itens)" class="excluir">Excluir</Button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import type ListarRacao from '../interface/ListarRacao';
  import { deleteItem, obterRacao } from '../http';
  import BarraMenu from './BarraMenu.vue';
  import { updateRacao } from '../http';
  import type AtualizarRacao from '@/interface/AtualizarRacao';
  
  
  
  export default defineComponent({
    name: "CadastroProduto",
    components: {
  
  
  
    },
    data() {
      return {
        item: [] as ListarRacao[],
        racoes: [] as { id: number, nome: string, kgQuantidade: number, valorPago: number, dataCompra: string }[],
        racao: {
          id: 0,
          nome: '',
          kgQuantidade: 0,
          valorPago: 0,
          dataCompra: '',
        },
        visible: false,
        products: null as null | any,
        editingRows: [],
        excluirDialogVisible: false,
        selectedRowData: null as null | ListarRacao,
        valorTotal: '0',
        update: false,
  
  
  
      };
    },
  
    methods: {
      async abrirDialog(rowData: ListarRacao) {
        this.selectedRowData = rowData;
        this.visible = true;
      },
      liberarUpdate(item: ListarRacao) {
        this.item.forEach(i => i.update = false);
        item.update = true;
  
      },
      cancelar(item: ListarRacao) {
        item.update = false
      },
      async atualizar(item: ListarRacao) {
        const dataAtualizar: AtualizarRacao = {
          id: item.id,
          nome: item.nome,
          kgQuantidade: item.kgQuantidade,
          valorPago: item.valorPago,
          dataCompra: item.dataCompra,
        };
        let mensagem = '';
  
  switch(true) {
    case dataAtualizar.nome === '':
      mensagem = 'O nome da ração não pode ser nula.';
      break;
  
    case dataAtualizar.kgQuantidade == null:
    mensagem = 'Informe o a quantidade da ração.';  
    break;
    case dataAtualizar.valorPago == null:
      mensagem = 'Informe o valor da racão.'
      break;
  
    case dataAtualizar.dataCompra == null:
      mensagem = 'Informe a data que você comprou'
      break;   
  }
  
  if (mensagem === '') {
    try {
      await updateRacao(dataAtualizar);
      alert("Ração salva!");
      console.log(dataAtualizar);
      window.location.reload();
    } catch (error) {
      alert("Verifique se a data está correta")
      console.error('Erro ao atualizar a ração:', error);
    }
  }
      },
  
      async cancelarDelete() {
        if (this.selectedRowData) {
          const id = this.selectedRowData.id;
          await deleteItem(id);
          window.location.reload();
        }
      },
      valorGasto() {
        let valorTotal = 0;
        for (const item of this.item) {
          valorTotal += item.valorPago;
        }
        this.valorTotal = valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  
      },
      async calcula(event: any) {
        this.valorGasto();
      },
      cancelDelete() {
        this.selectedRowData = null;
        this.visible = false;
      },
      async excluirItem(id: number) {
        debugger;
  
        console.log("id", id);
  
        const excluir = await deleteItem(id)
  
      },
      async onRowEditSave(event: any) {
        console.log("EVENTO: ", event);
        let data = event.newData as AtualizarRacao;
        let mensagem = '';
        try {
          const salvar = await updateRacao(data);
          window.location.reload();
          mensagem = 'Ração salva!'
  
          console.log();
  
        }
        catch (error) {
          mensagem = 'Verifique sua data'
        }
        alert(mensagem)
      },
      formatCurrency(value: number | bigint) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
      },
      async listarRacao() {
        const racoes = await obterRacao() as unknown as ListarRacao[];
        this.item = racoes.map(racao => ({ ...racao, selecionado: false }));
        this.racoes = racoes.map(racao => ({
          ...racao,
          dataCompra: new Date(racao.dataCompra).toLocaleDateString('pt-BR')
        }));
        this.valorGasto();
  
      },
      formatDateColumn(data: Date) {
        // Converte a data do formato YYYY/MM/DD para DD/MM/YYYY antes de exibi-la
        //     const formattedDate = format(data, 'dd/MM/yyyy');
        //   return formattedDate;
      },
      camposPreenchidos(item: AtualizarRacao){
    for (const item of this.item) {
      if (
        item.nome === '' ||
        item.kgQuantidade === 0 ||
        item.valorPago === 0 ||
        item.dataCompra === ''
      ) {
        return false;
      }
    }
    return true;
      }
    },
    created() {
      this.listarRacao();
    },
  });
  </script>
  
  <style scoped>
  .cards-lista {
    display: none;
  }
  
  .input-habilitado {
   border: 2px solid darkgray;
  }
  
  .lista {
    height: 30rem;
    display: flex;
  
    margin-left: 26%;
    margin-top: 9%;
    width: 100%;
    position: absolute;
  }
  .enviar {
      background-color: white;
      width: 100px;
      color: black;
      height: 2rem;
      border: 2px solid white;
      border-radius: 8px;
  }
  .enviar:hover {
      background-color: #5CB9EE;
      color: white;
  }
  
  button {
    justify-content: center;
    height: 2rem;
    border: 2px solid;
    border-radius: 6px;
  
  }
  
  .pi {
    color: black;
  }
  h3{
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
  }
  
  button:hover {
    background-color: red;
    color: white
  }
  
  .lista-vazia {
    width: 30%;
    display: flex;
    height: 2rem;
    justify-content: center;
    align-items: center;
    margin: 12% 16%;
  }
  
  .titulo-lista-vazia {
    color: grey;
    font-size: 24px;
  }
  
  .dialog-cancelar {
    background-color: red
  }
  
  .campo-data,
  .campo-quantidade,
  .campo-valor {
    display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 20px;
      border: 2px solid;
      border-radius: 6px;
      padding: 0px 10px;
  }
  
  .campos-habilitados{
    border: 2px solid darkgray;
  }
  p {
    margin-bottom: 0
  }
  
  .tabela {
    box-shadow: 0px 6px 14px 0px;
    width: 70%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  
  .cancela-item {
    display: flex;
    gap: 15px;
    padding: 0px 5px;
    justify-content: center;
  }
  
  .excluir {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 100px;
    color: red;
    height: 2rem;
    border: 2px solid white;
    border-radius: 8px;
  
  }
  
  .valor-gasto {
    padding: 2% 2%;
  }
  
  .excluir:hover {
    background-color: red;
    color: white;
  }
  
  
  .cancelar {
    background-color: white;
    width: 100px;
    color: #5CB9EE;
    height: 2rem;
    border: 2px solid white;
    border-radius: 8px;
  }
  
  .cancelar:hover {
    background-color: #5CB9EE;
    color: white;
  }
  
  .card-container {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    height: 20rem;
    overflow-x: hidden;
    overflow-y: auto;
    margin-left: 24%;
  }
  
  
  
  .card-header {
    padding: 20px;
    border-bottom: 1px solid #ddd;
  
  }
  
  .card-body {
    padding: 20px;
  }
  
  .card-footer {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-top: 1px solid #ddd;
  }
  @media screen and (max-width: 1400px) {
    .tabela {
      width: 100%;
      margin-left: 6%;
    }
  
    .lista {
      margin-top: 12%;
      width: 78%;
      justify-content: center;
    }
  
  }
  
  @media screen and (max-width: 1200px) {
    .tabela {
      width: 100%;
      margin-left: 6%;
    }
  
    .lista {
      margin-top: 12%;
      width: 78%;
      justify-content: center;
    }
    
  }
  
  
  @media screen and (max-width: 1200px) {
    .lista {
          margin-top: 11%;
          margin-left: 20%;
          height: 28rem;
    }
  }
  
  
  
  @media screen and (max-width: 990px) {
    .lista {
      align-items: center;
      width: 60%;
      margin-left: 30%;
      margin-top: 9%;
  
    }
  
    .tabela {
      width: 100%;
      margin-top: 20px;
      display: none;
  
    }
  
    .cards-lista {
      display: flex;
          height: 40rem;
          overflow-y: auto;
          overflow-x: hidden;
          margin-top: 70%;
  
    }
  
  }
  
  @media screen and (max-width: 720px) {
    .lista {
      margin-left: 3%;
      width: 90%;
      margin-top: 0%
    }
  
    .cards-lista {
      display: flex;
          height: 30rem;
          overflow-y: auto;
          overflow-x: hidden;
          margin-top: 80%;
    }
  }
  @media screen and (max-width: 720px) {
    .cards-lista[data-v-8cca4400] {
          display: flex;
          height: 23rem;
          overflow-y: auto;
          overflow-x: hidden;
          margin-top: 28%;
    }
  }
  </style>
  