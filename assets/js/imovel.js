const fotoPrincipal = document.getElementById("foto-principal");
const thumbs = document.querySelectorAll(".thumb");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxContador = document.getElementById("lightbox-contador");
const btnFechar = document.getElementById("lightbox-fechar");
const btnPrev = document.getElementById("lightbox-prev");
const btnNext = document.getElementById("lightbox-next");

const fotos = Array.from(thumbs).map((thumb) => thumb.src);
let fotoAtual = 0;

function trocarFoto(thumb) {
  fotoPrincipal.src = thumb.src;
  thumbs.forEach((t) => t.classList.remove("ativa"));
  thumb.classList.add("ativa");
  fotoAtual = fotos.indexOf(thumb.src);
}

function abrirLightbox(indice) {
  fotoAtual = indice;
  lightboxImg.src = fotos[fotoAtual];
  lightboxContador.textContent = `${fotoAtual + 1} / ${fotos.length}`;
  lightbox.classList.add("aberto");
  document.body.style.overflow = "hidden";
}

function fecharLightbox() {
  lightbox.classList.remove("aberto");
  document.body.style.overflow = "";
}

function navegar(direcao) {
  fotoAtual = (fotoAtual + direcao + fotos.length) % fotos.length;
  lightboxImg.src = fotos[fotoAtual];
  lightboxContador.textContent = `${fotoAtual + 1} / ${fotos.length}`;
}

fotoPrincipal.addEventListener("click", () => {
  abrirLightbox(fotoAtual);
});

btnFechar.addEventListener("click", fecharLightbox);
btnPrev.addEventListener("click", () => navegar(-1));
btnNext.addEventListener("click", () => navegar(1));

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) fecharLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("aberto")) return;
  if (e.key === "ArrowRight") navegar(1);
  if (e.key === "ArrowLeft") navegar(-1);
  if (e.key === "Escape") fecharLightbox();
});
