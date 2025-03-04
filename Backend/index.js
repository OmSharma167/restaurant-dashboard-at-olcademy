

const dotEnv = require("dotenv");
dotEnv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const categoryRoutes = require("./routes/CategoryRoutes");

const itemRoutes = require("./routes/itemRoutes");
const comboRoutes = require("./routes/comboRoutes");


  const fs = require("fs");
  const path = require("path");


const app = express();



app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(cors());

// ✅ MongoDB Connection
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/appDatabase";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    // ✅ Start the server **ONLY AFTER** MongoDB is connected
    const PORT = process.env.PORT || 4040;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });


  const uploadDir = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

// ✅ Routes
app.use("/api/categories", categoryRoutes);

app.use("/api/items", itemRoutes);
app.use("/api/combos", comboRoutes);

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("<h1>This is Olcademy project</h1>");
});
