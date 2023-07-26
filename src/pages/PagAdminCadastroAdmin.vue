<template>
  <q-form @submit="cadastrarAdmin">
    <h6 class="title">Adicionar Admin</h6>
    <div class="admin-form">
      <div>
        <q-input label="Nome" v-model="nomeRef" required></q-input>
      </div>
      <div>
        <q-input label="Login" v-model="loginRef" required></q-input>
      </div>
      <div>
        <q-input label="Senha" v-model="senhaRef" type="password" required></q-input>
      </div>
      <q-btn type="submit" label="Cadastrar"></q-btn>
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
        alert('Admin Salvo com Sucesso !');
      } catch (error) {
        alert('Erro: ' + error);
        console.error('Erro ao cadastrar o admin:', error);
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
.title {
  text-align: center;
  margin-bottom: 20px;
}

.admin-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.q-input {
  width: 300px;
  margin-bottom: 20px;
}

q-btn {
  margin-top: 20px;
}
</style>
