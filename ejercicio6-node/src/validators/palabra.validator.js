import Joi from 'joi';
const schema = Joi.object({
  palabra: Joi.string().trim().min(1).max(200).required()
});
export function validatePalabra(payload) {
  return schema.validate(payload, { abortEarly: false });
}
