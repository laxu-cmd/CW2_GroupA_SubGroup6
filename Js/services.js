document.addEventListener("DOMContentLoaded", function () {

    const progress = document.getElementById("scrollProgress");
    window.addEventListener("scroll", () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
        progress.style.width = pct + "%";
    }, { passive: true });

    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 60);
    }, { passive: true });

    document.querySelectorAll(".faq-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const body = document.getElementById(btn.getAttribute("aria-controls"));
            const isOpen = btn.getAttribute("aria-expanded") === "true";

            document.querySelectorAll(".faq-btn").forEach(other => {
                if (other !== btn) {
                    other.setAttribute("aria-expanded", "false");
                    const otherBody = document.getElementById(other.getAttribute("aria-controls"));
                    if (otherBody) otherBody.classList.remove("open");
                }
            });

            btn.setAttribute("aria-expanded", String(!isOpen));
            if (body) body.classList.toggle("open", !isOpen);
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const delay = entry.target.classList.contains("service-card") ? i * 80 : 0;
                setTimeout(() => entry.target.classList.add("visible"), delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".fade-in, .service-card")
        .forEach(el => observer.observe(el));

    const heroBg = document.querySelector(".hero-bg");
    if (heroBg) {
        window.addEventListener("scroll", () => {
            if (window.scrollY < window.innerHeight) {
                heroBg.style.transform = `scale(1.04) translateY(${window.scrollY * 0.15}px)`;
            }
        }, { passive: true });
    }

});
