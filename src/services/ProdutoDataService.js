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
      const resposta = await http.get("produtos");
      return resposta.data;
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
      throw error;
    }
  },

  listarProdutosInativos: async () => {
    try {
      const respostaInativos = await http.get("produtos/inativos");
      return respostaInativos.data;
    } catch (error) {
      console.error("Erro ao listar produtos inativos:", error);
      throw error;
    }
  },

  obterProduto: async (id) => {
    try {
      const resposta = await http.get(`produtos/${id}`);
      return resposta.data;
    } catch (error) {
      console.error("Erro ao obter o produto:", error);
      throw error;
    }
  },

  editarProduto: async (id, produto) => {
    try {
      const resposta = await http.put(`produtos`, produto);
      console.log(resposta);
      return alert("Produto atualizado com sucesso!");
    } catch (error) {
      console.log("Erro ao editar o produto:", error);
      throw error;
    }
  },

  excluirProduto: async (id) => {
    try {
      await http.delete(`produtos/${id}`);
    } catch (error) {
      console.error("Erro ao excluir o produto:", error);
      throw error;
    }
  },

  salvarProduto: async (produto) => {
    try {
      const resposta = await http.post("produtos", produto);
      console.log(resposta);
      return alert("Produto cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar o produto:", error);
    }
  },

  reativarProduto: async (id) => {
    try {
      await http.delete(`produtos/reativar/${id}`);
      return alert("Produto reativado com sucesso!");
    } catch (error) {
      console.error("Erro ao reativar o produto:", error);
      throw error;
    }
  },
};
