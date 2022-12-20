import { connectionDB } from "../database/db.js";
import { nanoid } from "nanoid";

export const postUrl = async (req, res) => {
  const { url } = req.body;
  const shortUrl = nanoid(6);
  const token = req.token

  try {
    const userId = (await connectionDB.query(`SELECT * FROM sessions WHERE token=$1`, [token])).rows[0].userId
    await connectionDB.query(
      `INSERT INTO urls ("shortUrl", url, "userId") VALUES ($1, $2, $3)`,
      [shortUrl, url, userId]
    );
    res.status(200).send(shortUrl);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
