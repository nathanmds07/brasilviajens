window.addEventListener("DOMContentLoaded", () => {
  // Aplicar modo escuro salvo no localStorage
  const modoSalvo = localStorage.getItem("modoEscuro");
  if (modoSalvo === "true") {
    document.body.classList.add("dark-mode");
  }

  // Saudação dinâmica (index.html)
  const saudacao = document.getElementById("saudacao");
  if (saudacao) {
    const hora = new Date().getHours();
    let mensagem = "";
    if (hora >= 6 && hora < 12) mensagem = "Bom dia!";
    else if (hora >= 12 && hora < 18) mensagem = "Boa tarde!";
    else mensagem = "Boa noite!";
    saudacao.textContent = mensagem;
  }

  // Modal simples para a galeria (galeria.html)
  const galeriaImgs = document.querySelectorAll('.galeria img');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const descricao = document.getElementById('descricao');
  const btnFechar = document.getElementById('btn-fechar');

  if (galeriaImgs.length && modal && modalImg && descricao) {
    galeriaImgs.forEach(img => {
      img.addEventListener('click', () => {
        modal.classList.add('active');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        descricao.textContent = img.closest('figure').querySelector('figcaption').innerText;
        modal.focus();
      });
    });

    btnFechar.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });

    // Fechar modal com ESC
    window.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') {
        modal.classList.remove('active');
      }
    });
  }

  // Mostrar mais/menos (sobre.html)
  const botaoToggle = document.getElementById("btn-toggle");
  if (botaoToggle) {
    botaoToggle.addEventListener("click", () => {
      const conteudo = document.getElementById("conteudo-extra");
      if (!conteudo) return;

      if (conteudo.hasAttribute('hidden')) {
        conteudo.removeAttribute('hidden');
        botaoToggle.textContent = "Mostrar menos";
        botaoToggle.setAttribute("aria-expanded", "true");
      } else {
        conteudo.setAttribute('hidden', '');
        botaoToggle.textContent = "Mostrar mais";
        botaoToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Validação do formulário (contato.html)
  const form = document.getElementById("form-contato");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const nome = document.getElementById("nome");
      const email = document.getElementById("email");

      if (!nome.value.trim() || !email.value.trim()) {
        alert("Por favor, preencha o nome e o e-mail.");
        return;
      }

      alert("Mensagem enviada com sucesso!");
      form.reset();
    });
  }
});

// Alternar modo escuro (todas páginas)
function alternarModoEscuro() {
  document.body.classList.toggle("dark-mode");
  const estaEscuro = document.body.classList.contains("dark-mode");
  localStorage.setItem("modoEscuro", estaEscuro);
}
