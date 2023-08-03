<template>
	<q-form @submit="cadastrarAdmin" class="form-base">
		<h1 class="title">Cadastro de Colaboradores:</h1>
		<div class="admin-form">
			<div class="admin-input">
				<label for="nome">Nome:</label>
				<q-input outlined v-model="nomeRef" id="nome" required placeholder="Nome" class="input-narrow"></q-input>
			</div>
			<div class="admin-input">
				<label for="login">Login:</label>
				<q-input outlined v-model="loginRef" id="login" required placeholder="Login" class="input-narrow"></q-input>
			</div>
			<div class="admin-input">
				<label for="senha">Senha:</label>
				<q-input outlined v-model="senhaRef" id="senha" type="password" required placeholder="Senha"
					class="input-narrow"></q-input>
			</div>
			<q-btn type="submit" class="glossy q-px-xl q-py-xs cadastrar" color="primary" label="Cadastrar"></q-btn>
		</div>
	</q-form>
</template>

<script>
import { defineComponent, ref } from 'vue';
import AdminService from '../services/AdminDataService';

export default defineComponent({
	setup() {
		const nomeRef = ref('');
		const loginRef = ref('');
		const senhaRef = ref('');

		const cadastrarAdmin = async () => {
			try {
				const nome = nomeRef.value;
				const login = loginRef.value;
				const senha = senhaRef.value;

				const admin = {
					nome,
					login,
					senha,
				};

				await AdminService.salvarAdmin(admin);
			} catch (error) {
				alert('Erro: ' + error);
				console.error('Erro ao cadastrar o colaborador:', error);
			}
		};

		return {
			cadastrarAdmin,
			nomeRef,
			loginRef,
			senhaRef,
		};
	},
});
</script>

<style scoped>
.form-base {
	padding: 20px;
}

.title {
	margin-top: 50px;
	text-align: center;
	font-size: 30px;
	margin-bottom: 40px;
	font-weight: bold;

}

.admin-form {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.admin-input {
	margin-bottom: 10px;
}

.input-narrow {
	width: 300px;
}

label {
	display: block;
	margin-bottom: 5px;
	font-weight: bold;
}

q-btn.cadastrar {
	width: 120px;
	margin-top: 20px;
}
</style>
