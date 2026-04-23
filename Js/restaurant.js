const header = document.getElementById("header");
const scrollProgress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? (scrollTop / height) * 100 : 0;

    scrollProgress.style.width = `${progress}%`;

    if (scrollTop > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

document.querySelectorAll(".view-details-btn").forEach(button => {
    button.addEventListener("click", () => {
        const detailsId = button.getAttribute("aria-controls");
        const details = document.getElementById(detailsId);
        const isOpen = button.getAttribute("aria-expanded") === "true";

        document.querySelectorAll(".view-details-btn").forEach(otherBtn => {
            const otherId = otherBtn.getAttribute("aria-controls");
            const otherDetails = document.getElementById(otherId);

            if (otherBtn !== button) {
                otherBtn.setAttribute("aria-expanded", "false");
                otherDetails.classList.remove("open");
            }
        });

        button.setAttribute("aria-expanded", String(!isOpen));
        details.classList.toggle("open");
    });
});

document.querySelectorAll(".faq-btn").forEach(button => {
    button.addEventListener("click", () => {
        const faqId = button.getAttribute("aria-controls");
        const faqBody = document.getElementById(faqId);
        const isOpen = button.getAttribute("aria-expanded") === "true";

        document.querySelectorAll(".faq-btn").forEach(otherBtn => {
            const otherId = otherBtn.getAttribute("aria-controls");
            const otherBody = document.getElementById(otherId);

            if (otherBtn !== button) {
                otherBtn.setAttribute("aria-expanded", "false");
                otherBody.classList.remove("open");
            }
        });

        button.setAttribute("aria-expanded", String(!isOpen));
        faqBody.classList.toggle("open");
    });
});

const reservationForm = document.getElementById("reservationForm");
const reservationMsg = document.getElementById("reservationMsg");

if (reservationForm) {
    reservationForm.addEventListener("submit", e => {
        e.preventDefault();
        reservationMsg.textContent = "Reservation received. We will contact you shortly.";
        reservationForm.reset();
    });
}