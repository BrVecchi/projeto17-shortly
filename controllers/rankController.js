import { connectionDB } from "../database/db.js";

export async function getRanking(req, res) {

  try {
    const ranking = (await connectionDB.query(`
    SELECT u.id, u.name, SUM("visitCount") AS "visitCount", COUNT("userId") AS "linksCount"
    FROM users u
    LEFT JOIN urls l ON u.id = l."userId"
    GROUP BY u.id
    ORDER BY u.id ASC;`)).rows;

    res.status(200).send(ranking);
  } catch (error) {
    res.status(500).send(error.message);
  }
}



