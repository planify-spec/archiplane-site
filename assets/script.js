// Archiplane static landing — tiny JS only
(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Mobile nav
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    links.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  const toast = document.querySelector(".toast");
  const showToast = (text) => {
    if (!toast) return;
    toast.textContent = text || "Done";
    toast.hidden = false;
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => (toast.hidden = true), 1400);
  };

  // Copy email button
  document.querySelectorAll("[data-copy]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy");
      try{
        await navigator.clipboard.writeText(value);
        showToast("Copied");
      }catch{
        showToast("Copy failed");
      }
    });
  });

  // Form -> open mailto
  const mailBtn = document.querySelector("[data-mail]");
  const form = document.querySelector(".form");
  if (mailBtn && form) {
    mailBtn.addEventListener("click", () => {
      const name = form.querySelector('input[type="text"]')?.value?.trim() || "";
      const email = form.querySelector('input[type="email"]')?.value?.trim() || "";
      const details = form.querySelector("textarea")?.value?.trim() || "";

      const subject = encodeURIComponent("Project Inquiry — Archiplane");
      const body = encodeURIComponent(
        `Hi Archiplane,\n\nName: ${name}\nEmail: ${email}\n\nProject details:\n${details}\n\nThanks!`
      );
      window.location.href = `mailto:planify@archiplane.com?subject=${subject}&body=${body}`;
    });
  }
})();