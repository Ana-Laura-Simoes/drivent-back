import joi from "joi";

const acceptedTypes = ["Online", "Presencial"];

export default joi.object({
  userName: joi
    .string()
    .min(4)
    .required()
    .pattern(/^[A-Za-zÀ-úç'\s]+$/),
  userId: joi.number().required(),
  userEmail: joi.string().email().required(),
  price: joi.number().required(),
  type: joi
    .string()
    .valid(...acceptedTypes)
    .required(),
  hotel: joi.boolean().required(),
});
