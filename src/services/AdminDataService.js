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
			const resposta = await http.get("admins");
			return resposta.data;
		} catch (error) {
			console.error("Erro ao listar admins:", error);
			throw error;
		}
	},

	listarAdminsInativos: async () => {
		try {
			const resposta = await http.get("admins/inativos");
			return resposta.data;
		} catch (error) {
			console.error("Erro ao listar admins:", error);
			throw error;
		}
	},

	salvarAdmin: async (admin) => {
		try {
			const resposta = await http.post("admins", admin);
			console.log(resposta);
			return alert("Admin Cadastrado com Sucesso !");
		} catch (error) {
			console.error("Erro ao salvar o admin:", error);
			throw error;
		}
	},

	editarAdmin: async (id, admin) => {
		try {
			const resposta = await http.put(`admins/${id}`, admin);
			console.log(resposta);
			return alert("Admin atualizado com sucesso!");
		} catch (error) {
			console.log("Erro ao editar o admin:", error);
		}
	},

	obterAdmin: async (id) => {
		try {
			const resposta = await http.get(`admins/${id}`);
			return resposta.data;
		} catch (error) {
			console.error("Erro ao obter o admin:", error);
			throw error;
		}
	},
	excluirAdmin: async (id) => {
		try {
			await http.delete(`admins/${id}`);
			return alert("Produto excluido com sucesso!");
		} catch (error) {
			console.error("Erro ao excluir o admin:", error);
			throw error;
		}
	},
	reativarAdmin: async (id) => {
		try {
			await http.delete(`admins/reativar/${id}`);
			return alert("Produto reativado com sucesso!");
		} catch (error) {
			console.error("Erro ao Reativar o admin:", error);
			throw error;
		}
	},
};
