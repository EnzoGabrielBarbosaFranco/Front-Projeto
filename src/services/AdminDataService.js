import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  listarAdmins: async () => {
    try {
      const resposta = await http.get("admins", {
        withCredentials: true,
      });
      return resposta.data;
    } catch (error) {
      console.error("Erro ao listar colaboradores:", error);
      throw error;
    }
  },

  async verificarAdmin(adminLogin) {
    try {
      const resposta = await http.get(`admins/verificarAdmin/${adminLogin}`, {
        withCredentials: true,
      });
      const isAdmin = resposta.data && resposta.data.admin;
      return isAdmin || false; // Retorne true se o usuário for um administrador, caso contrário, false
    } catch (error) {
      console.error("Erro ao verificar admin:", error);
      throw error;
    }
  },

  listarAdminsInativos: async () => {
    try {
      const resposta = await http.get("admins/inativos", {
        withCredentials: true,
      });
      return resposta.data;
    } catch (error) {
      console.error("Erro ao listar colaboradores:", error);
      throw error;
    }
  },

  salvarAdmin: async (admin) => {
    try {
      const resposta = await http.post("admins", admin, {
        withCredentials: true,
      });
      console.log(resposta);
      return alert("Colaborador cadastrado com Sucesso !");
    } catch (error) {
      console.error("Erro ao salvar o colaborador:", error);
      throw error;
    }
  },

  editarAdmin: async (id, admin) => {
    try {
      const resposta = await http.put("admins", admin, {
        withCredentials: true,
      });
      console.log(resposta);
      return alert("Colaborador atualizado com sucesso!");
    } catch (error) {
      console.log("Erro ao editar o colaborador:", error);
    }
  },

  obterAdmin: async (id) => {
    try {
      const resposta = await http.get(`admins/${id}`, {
        withCredentials: true,
      });
      return resposta.data;
    } catch (error) {
      console.error("Erro ao obter o colaborador:", error);
      throw error;
    }
  },
  excluirAdmin: async (id) => {
    try {
      await http.delete(`admins/${id}`, {
        withCredentials: true,
      });
      return alert("Colaborador excluido com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o colaborador:", error);
      throw error;
    }
  },
  reativarAdmin: async (id) => {
    try {
      await http.delete(`admins/reativar/${id}`, {
        withCredentials: true,
      });
      return alert("Colaborador reativado com sucesso!");
    } catch (error) {
      console.error("Erro ao Reativar o colaborador:", error);
      throw error;
    }
  },
};
