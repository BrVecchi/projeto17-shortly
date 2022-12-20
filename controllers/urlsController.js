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
      return
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
      await connectionDB.query(`SELECT * FROM urls WHERE "shortUrl"=$1;`, [
        shortUrl,
      ])
    ).rows[0];
    if (!url) {
      res.sendStatus(404);
      return
    }
    const visitUpdated = url.visitCount + 1;
    console.log(visitUpdated);
    await connectionDB.query(
      `UPDATE urls SET "visitCount"=$1 WHERE "shortUrl"=$2`,
      [visitUpdated, shortUrl]
    );
    const urlToRedirect = url.url;
    res.redirect(urlToRedirect);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function deleteUrl(req, res) {
  const urlValidation = req.urlValidation
  const token = req.token;
  const {id} = req.params

  try {
     const userIdByUrl = urlValidation.userId
     const userIdBySession = (await connectionDB.query(`SELECT "userId" FROM sessions WHERE token=$1;`, [token])).rows[0].userId;
     console.log(userIdBySession)
     console.log(userIdByUrl)
    if (userIdBySession!==userIdByUrl) {
      res.sendStatus(401);
      return
    }

    await connectionDB.query(`DELETE FROM urls WHERE id=$1`, [id]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
