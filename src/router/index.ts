

import { type RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import TelaCadastro from "@/components/TelaCadastro.vue";
import BarraMenu from "@/components/BarraMenu.vue";
import AtualizarUser from "@/components/AtualizarUser.vue";
import AtualizarSenha from "@/components/AtualiazarSenha.vue";
import ListarUsuario from "@/components/ListarUsuario.vue";


const rotas: RouteRecordRaw [] = [{
    path:'/',
    name:'BarraMenu',
    component: BarraMenu
},
{
    path:'/atualizar',
    name:'AtualizarUser',
    component:AtualizarUser
},

{
    path:'/login',
    name:'TelaCadastro',
    component:TelaCadastro
},{
    path:'/atualizarLogin',
    name:'AtualizarSenha',
    component:AtualizarSenha
},
{
    path:'/listarUsuario',
    name:'ListarUsuario',
    component:ListarUsuario
}
]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas

})

export default roteador;

