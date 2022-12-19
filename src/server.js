import express from "express";
import { authRouter } from "../routes/authRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import { urlsRouter } from "../routes/urlsRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(urlsRouter);
const port = process.env.PORT;

app.listen(port, () => console.log(`Está rodando na porta ${port}!`));
