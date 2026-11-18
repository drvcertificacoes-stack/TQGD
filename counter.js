(() => {
  const cards = document.querySelectorAll(".insight-grid article strong");
  if (
    !cards.length ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  )
    return;
  const format = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        observer.unobserve(el);
        const original = el.textContent.trim();
        const negative = original.startsWith("−") || original.startsWith("-");
        const decimals = original.includes(",");
        const value = Number(
          original.replace(/[−%\s-]/g, "").replace(",", "."),
        );
        if (!Number.isFinite(value)) continue;
        el.setAttribute("aria-label", original);
        const start = performance.now(),
          duration = 1400;
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1),
            eased = 1 - Math.pow(1 - t, 3),
            n = value * eased;
          el.textContent =
            (negative ? "−" : "") +
            (decimals ? format.format(n) : Math.round(n)) +
            "%";
          if (t < 1) requestAnimationFrame(tick);
          else el.textContent = original;
        };
        requestAnimationFrame(tick);
      }
    },
    { threshold: 0.35 },
  );
  cards.forEach((el) => observer.observe(el));
})();
