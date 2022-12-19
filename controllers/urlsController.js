import { connectionDB } from "../database/db.js";
import { nanoid } from "nanoid";

export const postUrl = async (req, res) => {
  const { url } = req.body;
  const token = req.token;
  const shortUrl = nanoid(6);

  try {
    const session =  (await connectionDB.query(`SELECT * FROM sessions WHERE token=$1`, [token])).rows[0]

    await connectionDB.query(
      `INSERT INTO urls ("shortUrl", url, "sessionId") VALUES ($1, $2, $3)`,
      [shortUrl, url, session.id]
    );
    res.status(200).send(shortUrl);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
