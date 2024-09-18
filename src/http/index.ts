import type IRacao from "@/interface/IRacao"
import type ListarRacao from "@/interface/ListarRacao";
import type AtualizarRacao from "@/interface/AtualizarRacao";
import axios from "axios";
import type Cadastrousuario from "@/interface/CadastroUsuario";
import type LoginUser from "@/interface/LoginUser";
import type AtualizarUser from "@/interface/AtualizarUser";
import type AtualizacaoUsuario from "@/interface/AtualizacaoUsuario";
import type EsqueceuSenha from "@/interface/EsqueceuSenha";
import type ListarUsuario from "@/interface/ListarUsuario";
import type ListarUsuarios from "@/interface/ListarUsuarios";

export async function cadastroRacao(salvarRacao: IRacao): Promise<string> {
    const body = JSON.stringify(salvarRacao);
    // console.log(body);
    const resposta = await axios.post('http://localhost:8080/racao', salvarRacao);
    return resposta.data as string;
}
export async function obterRacao():Promise<ListarRacao> {
    const resposta = await axios.get('http://localhost:8080/racao');
   
    
    return resposta.data.content as ListarRacao;
}
export async function obterUsuario():Promise<ListarUsuarios> {
    const resposta = await axios.get('http://localhost:8080/usuario');
   
    
    return resposta.data.content as ListarUsuarios;
}
export async function obterLogin():Promise<ListarUsuario> {
    const resposta = await axios.get('http://localhost:8080/login');
   console.log(resposta);
   
    
    return resposta.data.content as ListarUsuario;
}

    export async function updateRacao(atualizarRacao: AtualizarRacao): Promise<string> {
        try {            
            const resposta = await axios.put('http://localhost:8080/racao', JSON.stringify(atualizarRacao), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            return resposta.data as string;
        } catch (error) {
            console.error('Erro ao atualizar a ração:', error);
            throw error;
        }
    }

    export async function deleteItem(id:number) {
        const resposta = await axios.delete(`http://localhost:8080/racao/${id}`)
        console.log(resposta , 'excluida');
        
    }
    export async function deleteUsuario(id:number) {
        const resposta = await axios.delete(`http://localhost:8080/usuario/${id}`)
        console.log(resposta , 'excluida');
        
    }
export async function Cadastrousuario(salvarUsuario: Cadastrousuario): Promise<string>{
    const body = JSON.stringify(salvarUsuario);
    const resposta = await axios.post('http://localhost:8080/usuario',salvarUsuario);

    return resposta.data as string;
}
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;

export async function gerarLogin (user: LoginUser):Promise<LoginUser>{
    const resposta = await axios.post('http://localhost:8080/login', user); 
    const token = resposta.data.token;
    const userNovo = userLogado()
    console.log(user + token);

    localStorage.setItem('token', token)
    console.log(localStorage, 'aaaaaaa');
    console.log(userNovo, 'sddsdsd');
    
    return token;
}

export async function realizarLogout(): Promise<void> {
  
    localStorage.removeItem('token');
    console.log(localStorage);
    
  }

export async function userLogado():Promise<LoginUser>{  
const resposta = await axios.get('http://localhost:8080/login');
console.log(resposta, 'o user aqui');

return resposta.data as LoginUser

}      
export async function verificarUsuarioLogado(dadosAtualizados: AtualizarUser) {
    try {
        const usuarioLogado = await userLogado();
        console.log('Usuário logado:', usuarioLogado);

        if (usuarioLogado) {
            const resposta = await axios.put('http://localhost:8080/user', dadosAtualizados);
            return resposta.data;
        }
    } catch (error) {
        console.error('Erro ao verificar usuário logado:', error);
    }
}
export async function updateUsuario(atualizarUsuario: AtualizacaoUsuario): Promise<string> {
    try {            
        const resposta = await axios.post('http://localhost:8080/usuario/atualizar', JSON.stringify(atualizarUsuario), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return resposta.data as string;
    } catch (error) {
        console.error('Erro ao atualizar a ração:', error);
        throw error;
    }
}

export async function esqueceuSenha(credenciais:EsqueceuSenha) {
    const resposta =  await axios.post('http://localhost:8080/user', credenciais)

    return resposta.data as string;
}
