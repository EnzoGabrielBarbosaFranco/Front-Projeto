<template>
  <div>
    <form @submit.prevent="submitForm">
      <div ref="recaptcha" class="g-recaptcha" :data-sitekey="reCaptchaSiteKey"></div>
      <br />
      <input type="submit" value="Enviar">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reCaptchaSiteKey: '6Lfbg6cnAAAAACQJrhuRO5MHF7FNYy5qrAdqUr5T',
    };
  },
  methods: {
    submitForm() {
      // Verificar se o reCAPTCHA foi resolvido
      const response = this.$refs.recaptcha.getResponse();

      if (!response) {
        // Se o reCAPTCHA não foi resolvido, exiba uma mensagem de erro ou tome alguma ação apropriada.
        console.error('Por favor, resolva o reCAPTCHA antes de enviar o formulário.');
        return;
      }

      // Lógica adicional de envio do formulário aqui
      console.log('Formulário enviado!');

      // Reiniciar o reCAPTCHA após o envio do formulário (opcional)
      this.$refs.recaptcha.reset();
    },
  },
  mounted() {
    // Quando o componente é montado, inicialize o reCAPTCHA
    const widgetId = grecaptcha.render(this.$refs.recaptcha, {
      sitekey: this.reCaptchaSiteKey,
      callback: this.onSubmitCallback, // Função de retorno de chamada para tratar a resposta do reCAPTCHA
    });

    // Armazene o ID do widget para reinicialização posterior se necessário
    this.$refs.recaptcha.widgetId = widgetId;
  },
  beforeUnmount() {
    // Antes de desmontar o componente, limpe o reCAPTCHA
    grecaptcha.reset(this.$refs.recaptcha.widgetId);
  },
};
</script>
