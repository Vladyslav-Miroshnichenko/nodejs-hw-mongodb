import Joi from 'joi';
import { typeList } from '../constants/contacts.js';

export const contactAddSchem = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...typeList)
    .required(),
});

export const contactUpdateSchem = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().min(3),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...typeList),
});
