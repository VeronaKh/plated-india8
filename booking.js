/* ============ 1. EMAILJS SETTINGS ============ */
const EMAILJS_PUBLIC_KEY   = "_LPCG_37bEpgOIVrc";
const EMAILJS_SERVICE_ID   = "service_ns3x6fb";
const TEMPLATE_CUSTOMER_ID = "template_aphahyg";  // goes to the guest
const TEMPLATE_OWNER_ID    = "template_2psxo1l";  // goes to the owner (ronika0705@gmail.com)

/* ============ 2. RESTAURANT RULES ============ */
const OPEN_DAYS_CLOSED = [1];      // 0=Sun ... 1=Mon  -> Monday closed
const FIRST_SLOT = "12:30";
const LAST_SLOT  = "22:30";        // last seating (closes 11 PM)
const MAX_GUESTS = 10;             // bigger groups: ask them to call

(function () {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  const form = document.getElementById("form");
  const topic = document.getElementById("topic");
  const bookingFields = document.getElementById("booking-fields");
  const dateEl = document.getElementById("date");
  const timeEl = document.getElementById("time");
  const guestsEl = document.getElementById("guests");
  const btn = document.getElementById("submit-btn");
  const statusEl = document.getElementById("form-status");

  /* ---- fill time slots (every 30 min) ---- */
  function buildSlots() {
    timeEl.innerHTML = '<option value="">Select time</option>';
    let [h, m] = FIRST_SLOT.split(":").map(Number);
    const [lh, lm] = LAST_SLOT.split(":").map(Number);
    while (h < lh || (h === lh && m <= lm)) {
      const d = new Date(2000, 0, 1, h, m);
      const label = d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
      timeEl.insertAdjacentHTML("beforeend", `<option value="${label}">${label}</option>`);
      m += 30; if (m >= 60) { m = 0; h++; }
    }
  }

  /* ---- fill guests ---- */
  function buildGuests() {
    guestsEl.innerHTML = '<option value="">Number of guests</option>';
    for (let i = 1; i <= MAX_GUESTS; i++) {
      guestsEl.insertAdjacentHTML("beforeend", `<option value="${i}">${i} ${i === 1 ? "guest" : "guests"}</option>`);
    }
  }

  /* ---- min date = today ---- */
  function setMinDate() {
    const t = new Date();
    t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
    dateEl.min = t.toISOString().split("T")[0];
  }

  /* ---- show booking fields only for reservations ---- */
  function toggleBooking() {
    const isBooking = topic.value === "Table reservation";
    bookingFields.style.display = isBooking ? "grid" : "none";
    [dateEl, timeEl, guestsEl].forEach(el => (el.required = isBooking));
    btn.textContent = isBooking ? "Request my table" : "Send message";
  }

  function say(msg, ok) {
    statusEl.textContent = msg;
    statusEl.style.color = ok ? "#2e7d32" : "#b3261e";
  }

  function prettyDate(iso) {
    const [y, mo, d] = iso.split("-").map(Number);
    return new Date(y, mo - 1, d).toLocaleDateString("en-IN", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    });
  }

  buildSlots(); buildGuests(); setMinDate(); toggleBooking();
  topic.addEventListener("change", toggleBooking);

  /* ---- submit ---- */
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    e.stopImmediatePropagation(); // stops any old handler in script.js from also firing

    if (form.website.value) return; // honeypot caught a bot
    if (!form.name.value.trim() || !form.email.validity.valid || !form.phone.value.trim()) {
      return say("Please fill in your name, a valid email and phone number.", false);
    }

    const isBooking = topic.value === "Table reservation";

    if (isBooking) {
      if (!dateEl.value || !timeEl.value || !guestsEl.value) {
        return say("Please choose a date, time and number of guests.", false);
      }
      const [y, mo, d] = dateEl.value.split("-").map(Number);
      if (OPEN_DAYS_CLOSED.includes(new Date(y, mo - 1, d).getDay())) {
        return say("Sorry, we're closed on Mondays. Please pick another day.", false);
      }
    } else if (!form.message.value.trim()) {
      return say("Please write your message.", false);
    }

    const params = {
      guest_name: form.name.value.trim(),
      guest_email: form.email.value.trim(),
      guest_phone: form.phone.value.trim(),
      topic: topic.value,
      booking_date: isBooking ? prettyDate(dateEl.value) : "-",
      booking_time: isBooking ? timeEl.value : "-",
      guests: isBooking ? guestsEl.value : "-",
      message: form.message.value.trim() || "None"
    };

    btn.disabled = true; say("Sending…", true);

    try {
      // 1) Notify the owner — always
      await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_OWNER_ID, params);
      // 2) Confirmation to the guest — only for reservations
      if (isBooking) await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_CUSTOMER_ID, params);

      say(isBooking
        ? "Thank you! Your table request is in. A confirmation email is on its way to " + params.guest_email + "."
        : "Thank you! We've received your message and will reply soon.", true);
      form.reset(); toggleBooking();
    } catch (err) {
      console.error(err);
      say("Something went wrong. Please call us on +91 9812345678 or email hello@platedindia.com.", false);
    } finally {
      btn.disabled = false;
    }
  });
})();
