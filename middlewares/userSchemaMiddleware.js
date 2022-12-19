import joi from "joi";

const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.any().valid(joi.ref('password')).required()
  });

  export const userSchemaValidation = (req, res, next) => {
    const validation = userSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    res.status(422).send(errors);
    return;
  }
  next()
}