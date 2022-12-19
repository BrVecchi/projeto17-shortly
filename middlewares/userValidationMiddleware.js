import bcrypt from "bcrypt";

export const userValidationMiddleware = async (req, res, next) => {
  const { password } = req.body;
  const userValidation = req.userValidation

  const passwordOk = bcrypt.compareSync(password, userValidation.password);
  if (!passwordOk) {
    return res.sendStatus(401);
  }
  
  next();
};
