import { connectionDB } from "../database/db.js";

export async function getRanking(req, res) {
  try {
    const ranking = (
      await connectionDB.query(`
    SELECT u.id, u.name, SUM("visitCount") AS "visitCount", COUNT("userId") AS "linksCount"
    FROM users u
    LEFT JOIN urls l ON u.id = l."userId"
    GROUP BY u.id
    ORDER BY "visitCount" DESC
    LIMIT 10
    ;`)
    ).rows;

    ranking.map((rank) => {
      if (rank.visitCount === null) {
        return (rank.visitCount = "0");
      }
    });

    ranking.sort(function (a, b) {
      if (a.visitCount < b.visitCount) return 1;
      if (a.visitCount > b.visitCount) return -1;
      return 0;
    });

    res.status(200).send(ranking);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
