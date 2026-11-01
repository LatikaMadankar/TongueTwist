import mongoose, { mongo } from "mongoose";

const tongueTwisterSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },

  language: {
    type: String,
    required: true,
  },

  difficulty: {
    type: String,
    required: true,
  },
});

export default mongoose.model("TTModels", tongueTwisterSchema);