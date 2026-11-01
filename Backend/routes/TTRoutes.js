import express from "express";
import TTModels from "../models/TTModels.js";

const router = express.Router();

router.get("/tt", async (req, res) => {
  try {
    const tongueTwisters = await TTModels.find();
    res.json(tongueTwisters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/language/:language", async (req, res) => {
  try {
    const filter = {
      language: req.params.language,
    };
    if (req.query.difficulty) {
      filter.difficulty = req.query.difficulty;
    }
    const tongueTwisters = await TTModels.find(filter);
    res.json(tongueTwisters);
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message, error: "Error creating tongue twister" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const newTT = new TTModels({
      text: req.body.text,
      language: req.body.language,
      difficulty: req.body.difficulty,
    });

    const savedTT = await newTT.save();
    res.status(201).json(savedTT);
  } catch (err) {
    res.status(500).json({ message: err.message, error: "Error creating tongue twister" });
  }
});

export default router;