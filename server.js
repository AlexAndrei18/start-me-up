const express = require("express");
const cors = require("cors");
const {
  resetDatabase,
  createElement,
  getAllElements,
  getElementById,
  updateElement,
  deleteElement,
} = require("@sorin9125/utils-ac");
const { database, participantModel } = require("./config");

const app = express();


app.use(express.json());
app.use(cors()); 
app.use(express.static("public")); 


app.get("/", (req, res) => {
  res.status(200).send("Serverul rulează și e conectat la baza de date ✅");
});


app.get("/reset", async (req, res) => {
  try {
    await database.sync({ force: true }); 
    console.log("✅ Baza de date resetată și tabela 'participants' recreată");
    res.status(200).send("Baza de date resetată cu succes.");
  } catch (err) {
    console.error("❌ Eroare la reset DB:", err);
    res.status(500).send("Eroare la resetarea bazei de date.");
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const { nume, prenume, nume_echipa, facultate, an, email, telefon, idee } = req.body;

    if (!nume || !prenume || !nume_echipa || !facultate || !an || !email || !telefon || !idee)
      return res.status(400).send("Toate câmpurile sunt obligatorii.");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).send("Email invalid.");

    if (!/^[0-9]{10}$/.test(telefon))
      return res.status(400).send("Număr de telefon invalid (10 cifre).");

    const newParticipant = await createElement(participantModel, {
      nume,
      prenume,
      nume_echipa,
      facultate,
      an,
      email,
      telefon,
      idee,
      created_at: new Date(),
    });

    console.log("✅ Participant adăugat:", newParticipant.dataValues);
    res.status(201).json({
      message: "Participant adăugat cu succes.",
      participant: newParticipant,
    });
  } catch (err) {
    console.error("❌ Eroare la POST /api/register:", err);
    res.status(500).send("Eroare la salvarea participantului.");
  }
});

app.get("/api/participants", async (req, res) => {
  try {
    const participants = await getAllElements(participantModel);
    res.status(200).json(participants);
  } catch (err) {
    console.error("❌ Eroare la GET /api/participants:", err);
    res.status(500).send("Eroare la obținerea participanților.");
  }
});

app.listen(3000, () => {
  console.log("🚀 Serverul rulează pe http://localhost:3000");
});
