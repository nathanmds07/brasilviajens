window.addEventListener("DOMContentLoaded", () => {
  // 1. Aplicar modo escuro salvo no localStorage
  const modoSalvo = localStorage.getItem("modoEscuro");
  if (modoSalvo === "true") {
    document.body.classList.add("dark-mode");
  }

  // 2. Saudação dinâmica (index.html)
  const saudacao = document.getElementById("saudacao");
  if (saudacao) {
    const hora = new Date().getHours();
    let mensagem = "";
    if (hora >= 6 && hora < 12) mensagem = "Bom dia!";
    else if (hora >= 12 && hora < 18) mensagem = "Boa tarde!";
    else mensagem = "Boa noite!";
    saudacao.textContent = mensagem;
  }

  // 3. Galeria com Modal (galeria.html)
  const galeriaImgs = document.querySelectorAll('.galeria img');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const descricao = document.getElementById('descricao');
  const btnFechar = document.getElementById('btn-fechar');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  if (galeriaImgs.length && modal && modalImg && descricao) {
    let imagens = [];
    let indiceAtual = 0;

    // Captura as imagens e figcaption de cada figure
    galeriaImgs.forEach((img, index) => {
      const figcaption = img.closest('figure')?.querySelector('figcaption');
      imagens.push({
        src: img.src,
        alt: img.alt || "",
        legenda: figcaption?.innerText || ""
      });

      img.addEventListener('click', () => abrirModal(index));
    });

    function abrirModal(indice) {
      indiceAtual = indice;
      mostrarImagem(indiceAtual);
      modal.classList.add('active');
      modal.focus();
    }

    function fecharModal(event) {
      if (event.target === modal || event.target === btnFechar) {
        modal.classList.remove('active');
      }
    }

    function mostrarImagem(indice) {
      if (indice < 0) indice = imagens.length - 1;
      if (indice >= imagens.length) indice = 0;
      indiceAtual = indice;
      modalImg.src = imagens[indiceAtual].src;
      descricao.textContent = imagens[indiceAtual].legenda;
    }

    function imagemAnterior(event) {
      event.stopPropagation();
      mostrarImagem(indiceAtual - 1);
    }

    function proximaImagem(event) {
      event.stopPropagation();
      mostrarImagem(indiceAtual + 1);
    }

    btnFechar?.addEventListener('click', fecharModal);
    btnPrev?.addEventListener('click', imagemAnterior);
    btnNext?.addEventListener('click', proximaImagem);
    modal?.addEventListener('click', fecharModal);

    window.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') fecharModal({ target: modal });
      else if (e.key === 'ArrowLeft') mostrarImagem(indiceAtual - 1);
      else if (e.key === 'ArrowRight') mostrarImagem(indiceAtual + 1);
    });
  }

  // 4. Mostrar mais/menos (sobre.html)
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

  // 5. Validação do formulário (contato.html)
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

// 6. Alternar modo escuro (todas páginas)
function alternarModoEscuro() {
  document.body.classList.toggle("dark-mode");
  const estaEscuro = document.body.classList.contains("dark-mode");
  localStorage.setItem("modoEscuro", estaEscuro);
}

// 7. Registrar o Service Worker (PWA)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((reg) => console.log("Service Worker registrado com sucesso:", reg.scope))
      .catch((err) => console.log("Erro ao registrar Service Worker:", err));
  });
}
