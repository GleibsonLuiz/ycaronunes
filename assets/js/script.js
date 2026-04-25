const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("aberto");
  hamburger.textContent = nav.classList.contains("aberto") ? "✕" : "☰";
});

window.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    nav.classList.remove("aberto");
    hamburger.textContent = "☰";
  }
});

const formulario = document.getElementById("formulario");

function validarCampo(id, erroId, mensagem) {
  const campo = document.getElementById(id);
  const erro = document.getElementById(erroId);
  if (!campo.value.trim()) {
    campo.classList.add("invalido");
    erro.textContent = mensagem;
    return false;
  }
  campo.classList.remove("invalido");
  erro.textContent = "";
  return true;
}

function validarEmail(id, erroId) {
  const campo = document.getElementById(id);
  const erro = document.getElementById(erroId);
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(campo.value.trim())) {
    campo.classList.add("invalido");
    erro.textContent = "Digite um e-mail válido";
    return false;
  }
  campo.classList.remove("invalido");
  erro.textContent = "";
  return true;
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const nomeOk = validarCampo("nome", "erro-nome", "Nome é obrigatório");
  const emailOk = validarEmail("email", "erro-email");
  const telefoneOk = validarCampo(
    "telefone",
    "erro-telefone",
    "Telefone é obrigatório",
  );
  const interesseOk = validarCampo(
    "interesse",
    "erro-interesse",
    "Selecione uma opção",
  );

  if (nomeOk && emailOk && telefoneOk && interesseOk) {
    document.getElementById("form-sucesso").style.display = "block";
    document.getElementById("btn-submit").style.display = "none";
    formulario.reset();
  }
});

const animados = document.querySelectorAll(
  ".animate, .animate-esquerda, .animate-direita",
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visivel");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

animados.forEach((el) => observer.observe(el));
