require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URL = `mongodb+srv://db_test:${process.env.MONGO_PASS}@mp-cluster.sy2gr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  prime: Boolean,
});

export const User = mongoose.model("Users", userSchema);
