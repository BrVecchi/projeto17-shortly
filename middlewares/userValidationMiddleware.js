import { connectionDB } from "../database/db.js";

export const userValidationMiddleware = async (req, res, next) => {
    const { email } = req.body;
    const userValidation = (await connectionDB.query(`SELECT * FROM users WHERE email=$1;`, [email])).rows[0]
    if (!userValidation) {
      res.sendStatus(401);
      return;
    }
    req.userValidation = userValidation
    next();
  };