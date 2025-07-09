// Alternar modo escuro e salvar no localStorage
function alternarModoEscuro() {
  document.body.classList.toggle("dark-mode");
  const estaEscuro = document.body.classList.contains("dark-mode");
  localStorage.setItem("modoEscuro", estaEscuro);
}

// Registro do Service Worker (PWA)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((reg) => console.log("Service Worker registrado:", reg.scope))
      .catch((err) => console.error("Erro ao registrar Service Worker:", err));
  });
}

window.addEventListener("DOMContentLoaded", () => {
  // Aplicar modo escuro salvo
  const modoSalvo = localStorage.getItem("modoEscuro");
  if (modoSalvo === "true") {
    document.body.classList.add("dark-mode");
  }

  // Saudação dinâmica
  const saudacao = document.getElementById("saudacao");
  if (saudacao) {
    const hora = new Date().getHours();
    let mensagem = "";
    if (hora >= 6 && hora < 12) mensagem = "Bom dia!";
    else if (hora >= 12 && hora < 18) mensagem = "Boa tarde!";
    else mensagem = "Boa noite!";
    saudacao.textContent = mensagem;
  }

  // Modal da galeria
  const galeriaImgs = document.querySelectorAll(".galeria img");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const descricao = document.getElementById("descricao");
  const btnFechar = document.getElementById("btn-fechar");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");

  let imagens = [];
  let indiceAtual = 0;

  galeriaImgs.forEach((img, i) => {
    const figcaption = img.closest("figure")?.querySelector("figcaption");
    imagens.push({
      src: img.src,
      legenda: figcaption?.innerText || img.alt || "",
    });

    img.addEventListener("click", () => {
      indiceAtual = i;
      mostrarImagem();
      modal.classList.add("active");
    });
  });

  function mostrarImagem() {
    const img = imagens[indiceAtual];
    if (img) {
      modalImg.src = img.src;
      descricao.textContent = img.legenda;
    }
  }

  function fecharModal() {
    modal.classList.remove("active");
  }

  function proximaImagem() {
    indiceAtual = (indiceAtual + 1) % imagens.length;
    mostrarImagem();
  }

  function imagemAnterior() {
    indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
    mostrarImagem();
  }

  if (modal && modalImg && descricao) {
    btnFechar?.addEventListener("click", fecharModal);
    btnNext?.addEventListener("click", proximaImagem);
    btnPrev?.addEventListener("click", imagemAnterior);
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) fecharModal();
    });

    window.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("active")) return;
      if (e.key === "Escape") fecharModal();
      else if (e.key === "ArrowRight") proximaImagem();
      else if (e.key === "ArrowLeft") imagemAnterior();
    });
  }

  // Mostrar mais/menos
  const btnToggle = document.getElementById("btn-toggle");
  const conteudo = document.getElementById("conteudo-extra");

  if (btnToggle && conteudo) {
    btnToggle.addEventListener("click", () => {
      const escondido = conteudo.hasAttribute("hidden");
      if (escondido) {
        conteudo.removeAttribute("hidden");
        btnToggle.textContent = "Mostrar menos";
        btnToggle.setAttribute("aria-expanded", "true");
      } else {
        conteudo.setAttribute("hidden", "");
        btnToggle.textContent = "Mostrar mais";
        btnToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Validação do formulário com mensagens inline
  const form = document.getElementById("form-contato");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Limpa mensagens de erro anteriores
      document.querySelectorAll(".erro").forEach(el => (el.textContent = ""));

      const nome = document.getElementById("nome");
      const email = document.getElementById("email");
      const mensagem = document.getElementById("mensagem");

      let valido = true;

      if (!nome.value.trim()) {
        mostrarErro("erro-nome", "Por favor, preencha seu nome.");
        valido = false;
      }

      if (!email.value.trim()) {
        mostrarErro("erro-email", "Por favor, preencha seu e-mail.");
        valido = false;
      } else if (!validarEmail(email.value.trim())) {
        mostrarErro("erro-email", "Por favor, insira um e-mail válido.");
        valido = false;
      }

      if (!mensagem.value.trim()) {
        mostrarErro("erro-mensagem", "Por favor, escreva uma mensagem.");
        valido = false;
      }

      if (!valido) return;

      alert("Mensagem enviada com sucesso!");
      form.reset();
    });

    function mostrarErro(id, msg) {
      const span = document.getElementById(id);
      if (span) {
        span.textContent = msg;
      }
    }

    function validarEmail(email) {
      const regex = /^\S+@\S+\.\S+$/;
      return regex.test(email);
    }
  }
});
