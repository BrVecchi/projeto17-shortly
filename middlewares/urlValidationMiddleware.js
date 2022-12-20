import { connectionDB } from "../database/db.js";

export const urlValidationMiddleware = async (req, res, next) => {
    const { id } = req.params;
    const urlValidation = (await connectionDB.query(`SELECT * FROM urls WHERE id=$1;`, [id])).rows[0]
    if (!urlValidation) {
      res.sendStatus(401);
      return;
    }
    req.urlValidation = urlValidation
    next();
  };