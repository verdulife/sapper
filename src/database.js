import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    prime: Boolean,
    list: Array
});

export const User = mongoose.model('Users', userSchema);