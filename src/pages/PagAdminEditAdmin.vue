<template>
  <q-form class="admin-form" @submit="editarAdmin">
    <q-input class="form-input" label="Nome" v-model="nomeRef" required></q-input>
    <q-input class="form-input" label="Login" v-model="loginRef" required></q-input>
    <q-input class="form-input" label="Senha" v-model="senhaRef" type="password" required></q-input>
    <q-btn class="submit-btn" type="submit" label="Salvar"></q-btn>
  </q-form>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AdminService from '../services/AdminDataService';

export default defineComponent({
  setup() {
    const router = useRouter();
    const nomeRef = ref('');
    const loginRef = ref('');
    const senhaRef = ref('');

    const editarAdmin = async () => {
      try {
        const nome = nomeRef.value;
        const login = loginRef.value;
        const senha = senhaRef.value;

        const admin = {
          nome,
          login,
          senha,
        };

        const adminId = router.currentRoute.value.params.id;
        await AdminService.editarAdmin(adminId, admin);
        alert('Admin atualizado com sucesso!');
        await carregarAdmin();
      } catch (error) {
        alert('Erro: ' + error);
        console.error('Erro ao editar o admin:', error);
      }
    };

    const carregarAdmin = async () => {
      try {
        const adminId = router.currentRoute.value.params.id;
        const admin = await AdminService.obterAdmin(adminId);
        nomeRef.value = admin.nome;
        loginRef.value = admin.login;
        senhaRef.value = admin.senha;
      } catch (error) {
        console.error('Erro ao carregar o admin:', error);
      }
    };

    onMounted(async () => {
      await carregarAdmin();
    });

    return {
      editarAdmin,
      nomeRef,
      loginRef,
      senhaRef,
    };
  },
});
</script>

<style scoped>
.admin-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-input {
  width: 300px;
  margin-bottom: 20px;
}

.submit-btn {
  margin-top: 20px;
}
</style>
