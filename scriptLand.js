document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll(".sobre__info, .sobre h1");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // evita observar de novo
        }
      });
    },
    { threshold: 0.1 }
  ); // menor valor = ativa mais cedo

  elementos.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll(
    ".sobre__info, .sobre h1, .degustacao h1, .degustacao__item"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Se for um item da degustação, aplica delay conforme a ordem
          if (entry.target.classList.contains("degustacao__item")) {
            const index = [...entry.target.parentElement.children].indexOf(
              entry.target
            );
            entry.target.style.transitionDelay = `${index * 0.3}s`; // 0.3s de diferença entre cada card
          }

          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elementos.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll(
    ".sobre__info, .sobre h1, .degustacao h1, .degustacao__item, .endereco h1, .enderco__mapa, .enderco__info"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Delays nas infos do endereço (entram em sequência)
          if (entry.target.classList.contains("enderco__info")) {
            const index = [...entry.target.parentElement.children].indexOf(
              entry.target
            );
            entry.target.style.transitionDelay = `${index * 0.3}s`;
          }

          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elementos.forEach((el) => observer.observe(el));
});

function toggleMenu() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");

  // Prevenir scroll do body quando menu estiver aberto
  if (mobileMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

// Fechar menu ao redimensionar a tela
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.getElementById("mobileMenu");

    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});
