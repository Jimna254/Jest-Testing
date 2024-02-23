import joi from "joi";

export const registerUserSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi
    .string()
    .email()
    .pattern(/^[a-zA-Z]+.[a-zA-Z]+@thejitu\.com$/)
    .required(),
  cohort_number: joi.string().required(),
  phone_number: joi.string().optional(),
  password: joi.string().required(),
});
