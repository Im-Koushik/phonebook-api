import express from "express";
import sequelize from "./config/db.config.js";
import contactRoutes from "./routes/contact.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api", contactRoutes);

sequelize
  .sync()
  .then((result) => {
    console.log("Database connected");
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
