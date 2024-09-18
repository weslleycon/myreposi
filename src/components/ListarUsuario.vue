<template>
    <div class="tela-lista">
    <h2 class="titulo-lista">
        Veja aqui os usuarios cadastrados!
    </h2>
    <div class="lista">
      <div v-if="usuario.length === 0" class="lista-vazia">
        <h2 class="titulo-lista-vazia">
          Você ainda não tem nenhuma ração cadastrada!
        </h2>
      </div>
      <div v-else class="card p-fluid tabela">
        <DataTable v-model:editingRows="editingRows" paginator :rows="10" :value="usuario" editMode="row" dataKey="id"
          @row-edit-save="onRowEditSave" style="padding: 10px 20px; overflow-x: auto;">
          <Column field="nome" sortable header="Nome" style="width: 20%; min-width: 100px;">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
          </Column>
          <Column field="idade" sortable header="Idade" style="width: 20%; min-width: 100px;">
            <template #editor="{ data, field }">
              <InputNumber v-model="data[field]" optionLabel="label" optionValue="value" />
            </template>
          </Column>
          <Column field="email" sortable header="Email" style="width: 20%; min-width: 100px;">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
          </Column>
          <Column field="telefone" sortable header="Telefone" style="min-width: 200px">
            <template #editor="{ data, field }">
              <InputMask id="basic" v-model="data[field]" placeholder="(99) 99999-9999" mask="(99) 99999-9999" />
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
      </div>
    </div>
    <Button @click="telaPrincipal" class="enviar" >Voltar</Button>
</div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import type ListarRacao from '../interface/ListarRacao';
  import { deleteItem, deleteUsuario, obterRacao, obterUsuario, updateUsuario } from '../http';
  import BarraMenu from './BarraMenu.vue';
  import { updateRacao } from '../http';
  import type AtualizarRacao from '@/interface/AtualizarRacao';
import type ListarUsuarios from '@/interface/ListarUsuarios';
import type AtualizacaoUsuario from '@/interface/AtualizacaoUsuario';
  
  
  
  export default defineComponent({
    name: "CadastroProduto",
    components: {
  
  
  
    },
    data() {
      return {
        usuario: [] as ListarUsuarios[],
        usuarioAqui: [] as { id: number, nome: string, telefone: string, idade: number, email: string }[],
        user: {
          id: 0,
          nome: '',
          idade: 0,
          telefone: '',
          email: '',
        },
        visible: false,
        products: null as null | any,
        editingRows: [],
        excluirDialogVisible: false,
        selectedRowData: null as null | ListarUsuarios,
        valorTotal: '0',
        update: false,
  
  
  
      };
    },
  
    methods: {
      async abrirDialog(rowData: ListarUsuarios) {
        this.selectedRowData = rowData;
        this.visible = true;
      },
      telaPrincipal(){
        this.$router.push("/")
      },
    //   liberarUpdate(item: ListarRacao) {
    //     this.usuario.forEach(i => i. = false);
    //     item.update = true;
  
    //   },
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
          await deleteUsuario(id);
          window.location.reload();
        }
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
        let data = event.newData as AtualizacaoUsuario;
        let mensagem = '';
        try {
          const salvar = await updateUsuario(data);
          window.location.reload();
          mensagem = 'Usuario atualizado!'
  
          console.log();
  
        }
        catch (error) {
          mensagem = 'Verifique os campos preenchidos'
        }
        alert(mensagem)
      },
      formatCurrency(value: number | bigint) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
      },
      async listarRacao() {
        const usuuario = await obterUsuario() as unknown as ListarUsuarios[];
        this.usuario = usuuario.map(usuuario => ({ ...usuuario, selecionado: false }));
     
  
      },
      formatDateColumn(data: Date) {
        // Converte a data do formato YYYY/MM/DD para DD/MM/YYYY antes de exibi-la
        //     const formattedDate = format(data, 'dd/MM/yyyy');
        //   return formattedDate;
      },
      camposPreenchidos(item: AtualizarRacao){
    for (const item of this.usuario) {
      if (
        item.nome === '' ||
        item.email === '' ||
        item.idade === 0 ||
        item.telefone === ''
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
  .tela-lissta{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .titulo-lista{
    color: Black;
    text-align: center;
  }
  .cards-lista {
    display: none;
  }
  
  .input-habilitado {
   border: 2px solid darkgray;
  }
  
  .lista {
    height: 30rem;
    display: flex;
    margin-left: 0%;
    margin-top: 4%;
    width: 100%;
    justify-content: center;

  }
  .enviar {
      background-color:darkgray;
      width: 100px;
      color: white;
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
  