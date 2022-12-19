import { connectionDB } from "../database/db.js";
import { nanoid } from "nanoid";

export const postUrl = async (req, res) => {
  const { url } = req.body;
  const sessionId = req.sessionId
  const shortUrl = nanoid(6);

  try {
    await connectionDB.query(
      `INSERT INTO urls ("shortUrl", url, "sessionId") VALUES ($1, $2, $3)`,
      [shortUrl, url, sessionId]
    );
    res.status(200).send(shortUrl);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
