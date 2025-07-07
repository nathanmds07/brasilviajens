window.addEventListener("DOMContentLoaded", () => {
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

  // Galeria e Modal
  const galeriaImgs = document.querySelectorAll('.galeria img');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const descricao = document.getElementById('descricao');
  const btnFechar = document.getElementById('btn-fechar');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  let indiceAtual = 0;

  function abrirModal(indice) {
    indiceAtual = indice;
    modal.classList.add('active');
    mostrarImagem(indiceAtual);
    modal.focus();
  }

  function fecharModal() {
    modal.classList.remove('active');
  }

  function mostrarImagem(indice) {
    if (indice < 0) indice = galeriaImgs.length - 1;
    if (indice >= galeriaImgs.length) indice = 0;
    indiceAtual = indice;
    modalImg.src = galeriaImgs[indiceAtual].src;
    descricao.textContent = galeriaImgs[indiceAtual].alt;
  }

  function imagemAnterior(event) {
    event?.stopPropagation();
    mostrarImagem(indiceAtual - 1);
  }

  function proximaImagem(event) {
    event?.stopPropagation();
    mostrarImagem(indiceAtual + 1);
  }

  galeriaImgs.forEach((img, i) => {
    img.addEventListener('click', () => abrirModal(i));
    img.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        abrirModal(i);
      }
    });
  });

  btnFechar.addEventListener('click', fecharModal);
  btnPrev.addEventListener('click', imagemAnterior);
  btnNext.addEventListener('click', proximaImagem);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal();
  });

  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') fecharModal();
    else if (e.key === 'ArrowLeft') mostrarImagem(indiceAtual - 1);
    else if (e.key === 'ArrowRight') mostrarImagem(indiceAtual + 1);
  });

  // Modo escuro - botão
  const btnModoEscuro = document.querySelector('button[onclick="alternarModoEscuro()"]');
  btnModoEscuro?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
});
