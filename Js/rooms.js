document.addEventListener("DOMContentLoaded", function () {
    const progress = document.getElementById("scrollProgress");
    const header = document.getElementById("header");
    const heroBg = document.querySelector(".hero-bg");
    const toastContainer = document.getElementById("toastContainer");

    function showToast(title, message = "", type = "info", duration = 2600) {
        if (!toastContainer) return;

        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.setAttribute("role", "status");

        const iconSVG = `
            <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M9 12l2 2 4-4"></path>
                <circle cx="12" cy="12" r="9"></circle>
            </svg>
        `;

        toast.innerHTML = `
            ${iconSVG}
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                ${message ? `<div class="toast-message">${message}</div>` : ""}
            </div>
            <button class="toast-close" aria-label="Close notification">&times;</button>
        `;

        toastContainer.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add("show");
        });

        const removeToast = () => {
            toast.classList.remove("show");
            toast.classList.add("hide");
            setTimeout(() => {
                toast.remove();
            }, 280);
        };

        const closeBtn = toast.querySelector(".toast-close");
        if (closeBtn) {
            closeBtn.addEventListener("click", removeToast);
        }

        setTimeout(removeToast, duration);
    }

    window.addEventListener(
        "scroll",
        () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
            if (progress) progress.style.width = pct + "%";

            if (header) {
                header.classList.toggle("scrolled", window.scrollY > 60);
            }

            if (heroBg && window.scrollY < window.innerHeight) {
                heroBg.style.transform = `scale(1.04) translateY(${window.scrollY * 0.15}px)`;
            }
        },
        { passive: true }
    );

    document.querySelectorAll(".view-details-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const content = btn.closest(".room-content");
            if (!content) return;

            const details = content.querySelector(".room-details");
            const roomTitle = content.querySelector("h3")?.textContent || "Room";
            const btnText = btn.querySelector(".btn-text");

            if (!details) return;

            const isOpen = btn.getAttribute("aria-expanded") === "true";

            btn.setAttribute("aria-expanded", String(!isOpen));
            details.classList.toggle("open", !isOpen);

            if (btnText) {
                btnText.textContent = !isOpen ? "Hide Details" : "View Details";
            }

            showToast(
                !isOpen ? `${roomTitle} details opened` : `${roomTitle} details closed`,
                !isOpen
                    ? "You can now view room size, facilities, floor, and guest capacity."
                    : "Room information has been collapsed.",
                !isOpen ? "success" : "info",
                2200
            );
        });
    });

    document.querySelectorAll(".faq-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const body = document.getElementById(btn.getAttribute("aria-controls"));
            const isOpen = btn.getAttribute("aria-expanded") === "true";

            document.querySelectorAll(".faq-btn").forEach((other) => {
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

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.closest(".rooms-grid") ? index * 80 : 0;
                    setTimeout(() => {
                        entry.target.classList.add("visible");
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    document
        .querySelectorAll(".fade-in, .room-card, .testimonial-card")
        .forEach((el) => observer.observe(el));
});