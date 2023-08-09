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
        <div class="password-input">
          <q-input outlined v-model="senhaRef" id="senha" :type="showPassword ? 'text' : 'password'" required
            placeholder="Senha" class="input-narrow"></q-input>
          <span class="show-password-icon" @click="togglePasswordVisibility">
            <font-awesome-icon :icon="showPassword ? faEyeSlash : faEye" class="password-icon" />
          </span>
        </div>
      </div>
      <q-btn type="submit" class="glossy q-px-xl q-py-xs cadastrar" color="primary" label="Cadastrar"></q-btn>
    </div>
  </q-form>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import AdminService from '../services/AdminDataService';

export default defineComponent({
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const router = useRouter(); // Inicializar instância do router
    const nomeRef = ref('');
    const loginRef = ref('');
    const senhaRef = ref('');
    const showPassword = ref(false);

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

        // Redirecionar para /admin após o cadastro bem-sucedido
        router.push('/admin');
      } catch (error) {
        alert('Erro: ' + error);
        console.error('Erro ao cadastrar o colaborador:', error);
      }
    };

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    return {
      cadastrarAdmin,
      nomeRef,
      loginRef,
      senhaRef,
      showPassword,
      togglePasswordVisibility,
      faEye,
      faEyeSlash,
    };
  },
});
</script>


<style scoped>
.form-base {
  padding: 20px;
}

.password-input {
  position: relative;
}

.show-password-icon {
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  z-index: 2;
}

.password-icon {
  font-size: 17px;
  color: #666;
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
