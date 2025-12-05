const express = require("express");
const path = require("path");
const session = require("express-session");

const fs = require("fs");
const rolesData = require("./src/data/roles.json");


const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


app.use(
  session({
    secret: "secret-nird-resistance",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/snake", (req, res) => {
  res.render("snake");
});

app.get("/audio", (req, res) => {
  res.render("audio");
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.get("/choose-role", (req, res) => {
  res.render("choose-role");
});

app.post("/choose-role", (req, res) => {
  const { role } = req.body;
  req.session.role = role;
  res.redirect(`/profile/${role}`);
});

app.get("/profile/:role", (req, res) => {
  const roleKey = req.params.role.toLowerCase(); // Convertit en minuscule
  const roleData = rolesData[roleKey];

  if (!roleData) {
    return res.status(404).send("Rôle inconnu."); // OK si clé inexistante
  }

  res.render("profile", {
    role: roleKey,
    roleData: roleData,
    missions: roleData.missions
  });
});





app.post("/choose-role", (req, res) => {
  const { role } = req.body;
  
  req.session.role = role;

  res.redirect(`/profile/${role}`);
});



app.get("/missions/:role", (req, res) => {
  const role = req.params.role;
  res.render("missions", { role });
});

app.get("/community", (req, res) => {
  res.render("community");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`��� Serveur lancé sur http://localhost:${PORT}`);
});
