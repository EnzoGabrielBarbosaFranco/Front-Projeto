import axios from "axios";
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();

const http = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  logarColaborador: async (usuario) => {
    try {
      const resposta = await http.post(`admins/login`, usuario, {
        withCredentials: true,
      });
  
      // Verifica se a resposta tem dados
      if (resposta.data) {
        console.log("Resposta completa:", resposta.data);
  
        // Usa uma expressão regular para extrair o token
        const match = resposta.data.match(/Token:\s*([^\s]+)/);
        
        // Verifica se houve correspondência
        if (match && match[1]) {
          const token = match[1];
          console.log("Token encontrado:", token);
  
          // Salva o token nos cookies
          cookies.set('token', token, { expires: '24h' });
          cookies.set('adminLogin', usuario.login, { expires: '365d' });
          console.log(usuario);
  
          // Verifica se há informações adicionais na resposta (por exemplo, resposta.data.admin)
          if (resposta.data.admin) {
            cookies.set('isAdmin', resposta.data.admin, { expires: '365d' });
          }
  
          // Exibe a mensagem de sucesso
          return alert("Colaborador logado com Sucesso!");
        } else {
          // Exibe uma mensagem de erro se não encontrar o token na resposta
          console.error("Erro ao logar colaborador: Token não encontrado na resposta:", resposta.data);
          return alert("Erro ao logar colaborador: Token não encontrado na resposta");
        }
      } else {
        // Exibe uma mensagem de erro se a resposta não contiver dados
        console.error("Erro ao logar colaborador: Resposta sem dados");
        return alert("Erro ao logar colaborador: Resposta inválida");
      }
    } catch (error) {
      console.error("Erro ao logar colaborador:", error);
      throw error;
    }
  },
};
