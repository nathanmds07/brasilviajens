window.addEventListener("DOMContentLoaded", () => {
  const saudacao = document.getElementById("saudacao");
  if (saudacao) {
    const hora = new Date().getHours();
    let mensagem = "";
    if (hora >= 6 && hora < 12) mensagem = "Bom dia!";
    else if (hora >= 12 && hora < 18) mensagem = "Boa tarde!";
    else mensagem = "Boa noite!";
    saudacao.textContent = mensagem;
  }

  const galeriaImgs = document.querySelectorAll('.galeria img');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const descricao = document.getElementById('descricao');
  const btnFechar = document.getElementById('btn-fechar');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  if (galeriaImgs.length > 0 && modal && modalImg && descricao) {
    let indiceAtual = 0;

    function abrirModal(indice) {
      indiceAtual = indice;
      modal.classList.add('active');
      mostrarImagem(indiceAtual);
      modal.focus();
    }

    function fecharModal(event) {
      // Fecha se clicar no fundo do modal (fundo escuro) ou no botão fechar
      if (event.target === modal || event.target === btnFechar) {
        modal.classList.remove('active');
      }
    }

    function mostrarImagem(indice) {
      if (indice < 0) indice = galeriaImgs.length - 1;
      if (indice >= galeriaImgs.length) indice = 0;
      indiceAtual = indice;
      modalImg.src = galeriaImgs[indiceAtual].src;
      descricao.textContent = galeriaImgs[indiceAtual].alt;
    }

    function imagemAnterior(event) {
      event.stopPropagation();
      mostrarImagem(indiceAtual - 1);
    }

    function proximaImagem(event) {
      event.stopPropagation();
      mostrarImagem(indiceAtual + 1);
    }

    galeriaImgs.forEach((img, i) => {
      img.addEventListener('click', () => abrirModal(i));
    });

    btnFechar.addEventListener('click', fecharModal);
    btnPrev.addEventListener('click', imagemAnterior);
    btnNext.addEventListener('click', proximaImagem);
    modal.addEventListener('click', fecharModal);

    window.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') fecharModal({ target: modal });
      else if (e.key === 'ArrowLeft') mostrarImagem(indiceAtual - 1);
      else if (e.key === 'ArrowRight') mostrarImagem(indiceAtual + 1);
    });
  }
});

function toggleConteudo() {
  const conteudo = document.getElementById("conteudo-extra");
  const botao = document.getElementById("btn-toggle");
  if (!conteudo || !botao) return;

  if (conteudo.hasAttribute('hidden')) {
    conteudo.removeAttribute('hidden');
    botao.textContent = "Mostrar menos";
    botao.setAttribute("aria-expanded", "true");
  } else {
    conteudo.setAttribute('hidden', '');
    botao.textContent = "Mostrar mais";
    botao.setAttribute("aria-expanded", "false");
  }
}

function validarFormulario(event) {
  event.preventDefault();

  const nome = document.getElementById("nome");
  const email = document.getElementById("email");

  if (!nome.value.trim() || !email.value.trim()) {
    alert("Por favor, preencha o nome e o e-mail.");
    return;
  }

  alert("Mensagem enviada com sucesso!");
  document.getElementById("form-contato").reset();
}

function alternarModoEscuro() {
  document.body.classList.toggle("dark-mode");
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Service Worker registrado com sucesso:', reg.scope))
      .catch(err => console.log('Falha ao registrar Service Worker:', err));
  });
}
