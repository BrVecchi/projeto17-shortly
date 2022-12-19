import { v4 as uuidV4 } from "uuid";
import { connectionDB } from "../database/db.js";

export const signIn = async (req, res) => {
  const userValidation = req.userValidation
  const token = uuidV4();

  try {
    await connectionDB.query(`INSERT INTO sessions (token, "userId", name) VALUES ($1, $2, $3)`, [token, userValidation.id, userValidation.name]);
    res.status(200).send(token);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
