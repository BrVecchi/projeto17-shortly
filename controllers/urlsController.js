import { connectionDB } from "../database/db.js";
import { nanoid } from "nanoid";

export const postUrl = async (req, res) => {
  const { url } = req.body;
  const shortUrl = nanoid(6);
  const token = req.token;

  try {
    const userId = (
      await connectionDB.query(`SELECT * FROM sessions WHERE token=$1`, [token])
    ).rows[0].userId;
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

export async function findUrlById(req, res) {
  const { id } = req.params;

  try {
    const url = (
      await connectionDB.query("SELECT * FROM urls WHERE id=$1;", [id])
    ).rows[0];
    if (!url) {
      res.sendStatus(404);
    }
    const toSendBody = {
      id: url.id,
      shortUrl: url.shortUrl,
      url: url.url,
    };
    res.status(200).send(toSendBody);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function redirectUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const url = (
      await connectionDB.query(`SELECT * FROM urls WHERE "shortUrl"=$1;`, [shortUrl])
    ).rows[0];
    if (!url) {
      res.sendStatus(404);
    }
    const urlToRedirect = url.url
    res.redirect(urlToRedirect);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
