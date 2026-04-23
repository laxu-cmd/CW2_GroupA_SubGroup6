document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const scrollProgress = document.getElementById("scrollProgress");
    const bookingForm = document.getElementById("bookingForm");

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const progress = height > 0 ? (scrollTop / height) * 100 : 0;

        if (scrollProgress) {
            scrollProgress.style.width = `${progress}%`;
        }

        if (header) {
            if (scrollTop > 20) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
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

    if (bookingForm) {
        bookingForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const room = document.getElementById("roomType").value;
            const checkin = document.getElementById("checkin").value;
            const checkout = document.getElementById("checkout").value;

            if (!room) {
                alert("Please select a room type");
                return;
            }

            if (!checkin || !checkout) {
                alert("Please select both dates");
                return;
            }

            const checkinDate = new Date(checkin);
            const checkoutDate = new Date(checkout);

            if (checkoutDate <= checkinDate) {
                alert("Check-out must be after check-in");
                return;
            }

            window.location.href = "rooms.html";
        });
    }
});

