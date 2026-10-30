// Pet Yanasu — interacciones del sitio
// IMPORTANTE: reemplaza el número de WhatsApp en index.html y aquí.
// Formato internacional sin +, espacios ni guiones. Ejemplo: 51987654321
const WHATSAPP_NUMBER = "519XXXXXXXX";

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Convierte los enlaces de compra de cada producto en mensajes personalizados.
document.querySelectorAll("[data-product]").forEach((link) => {
  const product = link.dataset.product;
  link.href = whatsappLink(`¡Hola, Pet Yanasu! 🐾 Quisiera consultar y comprar: ${product}. ¿Me pueden ayudar?`);
  link.target = "_blank";
  link.rel = "noopener";
});

// Actualiza también los enlaces generales de WhatsApp usando el mismo número.
document.querySelectorAll('a[href^="https://wa.me/"]').forEach((link) => {
  const currentMessage = new URL(link.href).searchParams.get("text") || "Hola Pet Yanasu";
  link.href = whatsappLink(currentMessage);
});

// Filtros de categorías
const filterButtons = document.querySelectorAll(".filter-chip");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const category = button.dataset.filter;
    productCards.forEach((card) => {
      card.hidden = category !== "todos" && card.dataset.category !== category;
    });
  });
});

// Menú móvil accesible
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
