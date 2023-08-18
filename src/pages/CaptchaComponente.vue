<template>
  <div>
    <form action="?" method="POST">
      <div class="g-recaptcha" :data-sitekey="reCaptchaSiteKey"></div>
      <br />
      <input type="submit" value="Submit">
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
};
</script>
