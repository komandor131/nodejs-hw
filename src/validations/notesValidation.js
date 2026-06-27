import { Joi } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

// Custom validator for MongoDB ObjectId
const objectIdValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message('"{#label}" must be a valid ObjectId');
  }
  return value;
};

// GET /notes query validation
export const getAllNotesSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS).optional(),
    search: Joi.string().allow('').optional(),
  }),
};

// noteId validation in params
export const noteIdSchema = {
  params: Joi.object({
    noteId: Joi.string().custom(objectIdValidator, 'ObjectId validation').required(),
  }),
};

// POST /notes body validation
export const createNoteSchema = {
  body: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow('').optional(),
    tag: Joi.string().valid(...TAGS).optional(),
  }),
};

// PATCH /notes/:noteId validation
export const updateNoteSchema = {
  params: Joi.object({
    noteId: Joi.string().custom(objectIdValidator, 'ObjectId validation').required(),
  }),
  body: Joi.object({
    title: Joi.string().min(1).optional(),
    content: Joi.string().allow('').optional(),
    tag: Joi.string().valid(...TAGS).optional(),
  }).or('title', 'content', 'tag'),
};
