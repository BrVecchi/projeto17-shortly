import { connectionDB } from "../database/db.js";

export async function getUser(req, res) {
  const token = req.token;

  try {
    const user = (await connectionDB.query(`
      SELECT u.id, u.name, SUM("visitCount") AS "visitCount", json_agg(json_build_object('id', l.id, 'shortUrl', l."shortUrl", 'url', l.url, 'visitCount', l."visitCount")) AS "shortenedUrls" 
      FROM users u
      JOIN urls l ON u.id = l."userId" 
      JOIN sessions s on u.id = s."userId"
      WHERE s.token = $1
      GROUP BY u.id;`, [token])).rows[0];

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
