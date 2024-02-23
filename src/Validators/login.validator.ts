import joi from "joi";

export const loginUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
