const HtmlUtil = {
  // Função para escapar caracteres especiais em HTML
  escape: (str) => {
    const escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return str.replace(/[&<>"']/g, (char) => escapeMap[char]);
  }
};

export default HtmlUtil;
