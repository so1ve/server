import Joi from "joi";

export const author = Joi.object({
  name: Joi.string()
    .required(),
  avatar: Joi.string()
    .required(),
  bio: Joi.string(),
});

export const post = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  sticky: Joi.boolean().required(),
  authors: Joi.array()
    .items(author)
    .required(),
  timestamp: Joi.date().required(),
  slug: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  category: Joi.string(),
  postMetas: Joi.object(),
});
