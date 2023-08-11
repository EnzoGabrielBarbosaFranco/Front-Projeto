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
        <div class="senha-feedback">
          <div class="senha-criterio" :class="{'criterio-aceito': isTamanhoMinimo}">
            <font-awesome-icon :icon="isTamanhoMinimo ? faCheck : faTimes" />
            Deve conter pelo menos 6 caracteres.
          </div>
          <div class="senha-criterio" :class="{'criterio-aceito': isCaractereEspecial}">
            <font-awesome-icon :icon="isCaractereEspecial ? faCheck : faTimes" />
            Deve conter pelo menos 1 caractere especial.
          </div>
          <div class="senha-criterio" :class="{'criterio-aceito': isLetraMaiuscula}">
            <font-awesome-icon :icon="isLetraMaiuscula ? faCheck : faTimes" />
            Deve conter pelo menos 1 letra maiúscula.
          </div>
          <div class="senha-criterio" :class="{'criterio-aceito': isNumero}">
            <font-awesome-icon :icon="isNumero ? faCheck : faTimes" />
            Deve conter pelo menos 1 número.
          </div>
        </div>
      </div>
      <q-btn type="submit" class="glossy q-px-xl q-py-xs cadastrar" color="primary" label="Cadastrar"></q-btn>
    </div>
  </q-form>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
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

         // Verificar se os campos nome e login não estão vazios
         if (nome.trim() === '' || login.trim() === '') {
          alert('Por favor, preencha todos os campos obrigatórios.');
          return;
        }

        if (!isSenhaSegura(senha)) {
          alert('A senha não atende aos critérios de segurança');
          return;
        }

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

    const isSenhaSegura = (senha) => {
      // Verificar se a senha atende aos critérios: pelo menos 6 caracteres, 1 especial, 1 maiúscula, 1 número
      return senha.length >= 6 && /[!@#$%^&*()\-_=+\\|{}\[\];:'",<.>/?]/.test(senha)
        && /[A-Z]/.test(senha) && /[0-9]/.test(senha);
    };

    const isTamanhoMinimo = computed(() => senhaRef.value.length >= 6);
    const isCaractereEspecial = computed(() => /[!@#$%^&*()\-_=+\\|{}\[\];:'",<.>/?]/.test(senhaRef.value));
    const isLetraMaiuscula = computed(() => /[A-Z]/.test(senhaRef.value));
    const isNumero = computed(() => /[0-9]/.test(senhaRef.value));

    return {
      cadastrarAdmin,
      nomeRef,
      loginRef,
      senhaRef,
      showPassword,
      togglePasswordVisibility,
      faEye,
      faEyeSlash,
      faCheck,
      faTimes,
      isTamanhoMinimo,
      isCaractereEspecial,
      isLetraMaiuscula,
      isNumero,
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

.senha-feedback {
  margin-top: 10px;
}

.senha-criterio {
  display: flex;
  align-items: center;
  margin-top: 5px;

}

.criterio-aceito {
  color: green;
  margin-left: 5px;
}

.criterio-aceito svg {
  width: 14px;
  height: 14px;
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
