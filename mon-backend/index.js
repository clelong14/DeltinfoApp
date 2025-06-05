import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Affiche un message de bienvenue
app.get("/", (req, res) => {
  res.send("Bienvenue sur mon backend Express !");
});

// GET tous les articles
app.get("/articles", async (req, res) => {
  const { data, error } = await supabase.from("articles").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Exemple : POST un nouvel article
app.post("/articles", async (req, res) => {
  const { titre, description, image_url } = req.body;

  const { data, error } = await supabase.from("articles").insert([
    { titre, description, image_url }
  ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

// Démarrer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend démarré sur http://192.168.30.230:${PORT}`);
});