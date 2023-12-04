import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 7000,
});

export default {
  listarProdutos: async () => {
    try {
      const resposta = await http.get("produtos", {
        withCredentials: true,
      });
      return resposta.data;
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
      throw error;
    }
  },

  listarProdutosInativos: async () => {
    try {
      const respostaInativos = await http.get("produtos/inativos", {
        withCredentials: true,
      });
      return respostaInativos.data;
    } catch (error) {
      console.error("Erro ao listar produtos inativos:", error);
      throw error;
    }
  },

  obterProduto: async (id) => {
    try {
      const resposta = await http.get(`produtos/${id}`, {
        withCredentials: true,
      });
      return resposta.data;
    } catch (error) {
      console.error("Erro ao obter o produto:", error);
      throw error;
    }
  },

  editarProduto: async (id, produto) => {
    try {
      const resposta = await http.put(`produtos`, produto, {
        withCredentials: true,
      });
      console.log(resposta);
      return alert("Produto atualizado com sucesso!");
    } catch (error) {
      console.log("Erro ao editar o produto:", error);
      throw error;
    }
  },

  excluirProduto: async (id) => {
    try {
      await http.delete(`produtos/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Erro ao excluir o produto:", error);
      throw error;
    }
  },

  salvarProduto: async (produto) => {
    try {
      const resposta = await http.post("produtos", produto, {
        withCredentials: true,
      });
      console.log(resposta);
      return alert("Produto cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar o produto:", error);
    }
  },

  reativarProduto: async (id) => {
    try {
      await http.delete(`produtos/reativar/${id}`, {
        withCredentials: true,
      });
      return alert("Produto reativado com sucesso!");
    } catch (error) {
      console.error("Erro ao reativar o produto:", error);
      throw error;
    }
  },
};
