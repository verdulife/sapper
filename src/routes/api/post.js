/* import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  prime: Boolean,
  list: Array,
});

const User = mongoose.model("Users", userSchema);

const user = new User({
  name: "Verdu",
  age: 33,
  prime: true,
  list: ["hello", "bye"],
});

user.save().then(() => console.log("User added"));
 */

export function post(req, res, next) {
  console.log(req.body);
}