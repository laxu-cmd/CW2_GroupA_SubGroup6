document.addEventListener("DOMContentLoaded", () => {
    const prices = {
        "Super Room": 139,
        "Deluxe Room": 99,
        "Family Room": 179
    };

    const els = {
        mainView: document.getElementById("mainView"),
        success: document.getElementById("success"),
        summary: document.getElementById("summary"),
        submitBtn: document.getElementById("submitBtn"),
        backBtn: document.getElementById("backBtn"),
        name: document.getElementById("name"),
        email: document.getElementById("email"),
        contact: document.getElementById("contact"),
        checkin: document.getElementById("checkin"),
        checkout: document.getElementById("checkout"),
        guests: document.getElementById("guests"),
        room: document.getElementById("room"),
        liveRoom: document.getElementById("liveRoom"),
        liveGuests: document.getElementById("liveGuests"),
        liveNights: document.getElementById("liveNights"),
        liveTotal: document.getElementById("liveTotal")
    };

    function calcNights() {
        const inDate = new Date(els.checkin.value);
        const outDate = new Date(els.checkout.value);
        if (!els.checkin.value || !els.checkout.value) return 0;
        const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
        return diff > 0 ? diff : 0;
    }

    function updateSummary() {
        const room = els.room.value;
        const guests = els.guests.value;
        const nights = calcNights();
        const price = prices[room] || 0;
        const total = nights * price;

        els.liveRoom.textContent = room || "—";
        els.liveGuests.textContent = guests;
        els.liveNights.textContent = nights;
        els.liveTotal.textContent = "£" + total;
    }

    function validate() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9+\-\s]{7,15}$/;

        if (!els.name.value.trim()) return false;
        if (!emailPattern.test(els.email.value.trim())) return false;
        if (!phonePattern.test(els.contact.value.trim())) return false;
        if (!els.room.value) return false;
        if (!els.checkin.value || !els.checkout.value) return false;
        if (calcNights() <= 0) return false;

        return true;
    }

    function submitReservation() {
        if (!validate()) {
            alert("Please complete all fields correctly.");
            return;
        }

        const data = {
            name: els.name.value.trim(),
            email: els.email.value.trim(),
            contact: els.contact.value.trim(),
            checkin: els.checkin.value,
            checkout: els.checkout.value,
            guests: els.guests.value,
            room: els.room.value,
            nights: calcNights(),
            price: prices[els.room.value],
            total: calcNights() * prices[els.room.value]
        };

        showSuccess(data);
    }

    function showSuccess(d) {
        els.mainView.style.display = "none";
        els.success.style.display = "block";

        els.summary.innerHTML = `
            <div><b>Name:</b> ${d.name}</div>
            <div><b>Email:</b> ${d.email}</div>
            <div><b>Contact:</b> ${d.contact}</div>
            <div><b>Room:</b> ${d.room}</div>
            <div><b>Guests:</b> ${d.guests}</div>
            <div><b>Nights:</b> ${d.nights}</div>
            <div><b>Total:</b> £${d.total}</div>
        `;
    }

    function goHome() {
        els.success.style.display = "none";
        els.mainView.style.display = "grid";
        window.scrollTo(0, 0);
    }

    els.room.addEventListener("change", updateSummary);
    els.guests.addEventListener("change", updateSummary);
    els.checkin.addEventListener("change", updateSummary);
    els.checkout.addEventListener("change", updateSummary);

    els.submitBtn.addEventListener("click", submitReservation);
    els.backBtn.addEventListener("click", goHome);
});
