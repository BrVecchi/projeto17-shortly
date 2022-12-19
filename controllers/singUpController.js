import bcrypt from "bcrypt";
import { connectionDB } from "../database/db.js";

export const signUp = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(401).send("Confirm password and password do not mach!");
    return;
  }

  try {
    const hashPassword = bcrypt.hashSync(password, 10);

    await connectionDB.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashPassword]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
