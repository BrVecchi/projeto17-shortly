import express from "express";
import router from "../routes/routes.js";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Está rodando na porta ${port}!`));