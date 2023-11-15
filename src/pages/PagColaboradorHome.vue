<template>
  <q-page class="q-pa-md">
    <h1 class="titulo">Login de Colaborador:</h1>
    <q-card class="quadrado" style="background-color: #c5c5c7;">
      <q-form @submit.prevent="logarColaborador" class="form-base">
        <div class="colaborador-form">
          <div class="colaborador-input">
            <label for="login" style="font-size: 15px;">Login:</label>
            <q-input v-model="loginRef" filled id="login" maxlength="50" pattern="[a-zA-Z0-9]+" required
              placeholder="Login" class="input-narrow"></q-input>
          </div>
          <div class="colaborador-input">
            <label for="senha" style="font-size: 15px;">Senha:</label>
            <div class="password-input">
              <q-input v-model="senhaRef" filled id="senha" :type="showPassword ? 'text' : 'password'" maxlength="50"
                required placeholder="Senha" class="input-narrow"></q-input>
              <span class="show-password-icon" @click="togglePasswordVisibility">
                <font-awesome-icon :icon="showPassword ? faEyeSlash : faEye" class="password-icon" />
              </span>
            </div>
            <div v-if="senhaIncorreta" class="error-popup">
              <span class="mensagemErrada">{{ mensagemSenhaInvalida }}</span>
            </div>
          </div>
          <q-btn type="submit" class="glossy q-px-xl q-py-xs cadastrar" color="primary" label="Entrar"></q-btn>
        </div>
      </q-form>
    </q-card>

    <!-- Renderizar o reCAPTCHA aqui -->
    <div class="captcha-container" id="captcha-container"></div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import LoginService from '../services/LoginDataService';
import { useRouter } from "vue-router";
import HtmlUtil from '../utils/HtmlUtil'; // Importe a função HtmlUtil.escape
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default defineComponent({
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const loginRef = ref("");
    const senhaRef = ref("");
    const senhaIncorreta = ref(false);
    const router = useRouter();
    const showPassword = ref(false);
    const mensagemSenhaInvalida = ref("");

    const logarColaborador = async () => {
      try {
        const login = HtmlUtil.escape(loginRef.value); // Escapar valor do login
        const senha = HtmlUtil.escape(senhaRef.value); // Escapar valor da senha

        // Simulando uma autenticação fictícia no frontend
        if (loginRef.value && senhaRef.value) {
          senhaIncorreta.value = false;
          const usuario = {
            login,
            senha,
          };

          await LoginService.logarColaborador(usuario);

          router.push("/admin"); // Redirecionar para o painel após o login bem-sucedido
        } else {
          console.error("Credenciais inválidas");
        }
      } catch (error) {
        console.error("Erro:", error.response.data);
        senhaIncorreta.value = true;
        mensagemSenhaInvalida.value = error.response.data;
      }
    };

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    // Quando o reCAPTCHA estiver pronto, renderize-o
    grecaptcha.ready(function () {
      grecaptcha.render("captcha-container", {
        sitekey: "6Lfbg6cnAAAAACQJrhuRO5MHF7FNYy5qrAdqUr5T"
      });
    });

    return {
      loginRef,
      senhaRef,
      logarColaborador,
      showPassword,
      togglePasswordVisibility,
      faEye,
      faEyeSlash,
      senhaIncorreta,
      mensagemSenhaInvalida,
    };
  },
});
</script>

<style>
.mensagemErrada{
  width: auto;
}

.error-popup {
  position: absolute;
  background-color: #ff4d4d; /* Cor de fundo vermelha */
  color: white; /* Cor do texto branco */
  padding: 10px;
  width: auto;
  border-radius: 5px;
  top: -169px; /* Posição a 375px do topo */
  left: 50%; /* Centralizar horizontalmente */
  transform: translateX(-50%); /* Centralizar horizontalmente */
  z-index: 999; /* Certifique-se de que esteja na parte superior */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Sombra */
}

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
  color: #464545;
}

.titulo {
  margin-top: 40px;
  text-align: center;
  font-size: 30px;
  margin-bottom: 10px;
  font-weight: bold;
}

.quadrado {
  max-width: 400px;
  margin: 0 auto;
  padding: 10px;
}

.colaborador-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.colaborador-input {
  margin-bottom: 10px;
}

.input-narrow {
  width: 300px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

q-btn.cadastrar {
  width: 120px;
  margin-top: 20px;
}

/* Estilos para centralizar o reCAPTCHA */
.captcha-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}</style>
