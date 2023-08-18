import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  logarColaborador: async (usuario) => {
    try {
      const resposta = await http.post(`admins/login`, usuario);
      console.log(resposta);
      return alert("Colaborador logado com Sucesso!");
    } catch (error) {
      console.error("Erro ao logar colaborador:", error);
      throw error;
    }
  },
};
