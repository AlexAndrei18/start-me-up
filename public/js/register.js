const form = document.getElementById("registerForm");
const statusEl = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "Se trimite...";

  const fd = new FormData(form);
  const data = Object.fromEntries(fd.entries());
  data.an = parseInt(data.an); // conversie importantă

  try {
    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Eroare necunoscută");

    statusEl.textContent = "Participant adaugat cu succes!";
    statusEl.style.color = "green";
    form.reset();
  } catch (err) {
    statusEl.textContent = "❌ Eroare: " + err.message;
    statusEl.style.color = "red";
  }
});
