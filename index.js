require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const DATABASE_URL = process.env.DATABASE_URL;
const app = express();
const userRoutes = require("./routes/userRoutes")
const User = require('./models/user');


app.use(express.json());
app.use(cors());

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas", err));



app.get("/search/:searchTerm", async (req, res) => {
  const searchTerm = req.params.searchTerm;
  try {
    const users = await User.find({
      $or: [
        { username: { $regex: searchTerm, $options: "i" } },
        { firstname: { $regex: searchTerm, $options: "i" } },
        { lastname: { $regex: searchTerm, $options: "i" } },
      ],
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use("/users", userRoutes);


app.listen(7004, () => {
  console.log(`Server running on port 7004`);
});
