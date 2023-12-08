import express from 'express';
import { 
  createClass, 
  deleteClass, 
  findAllMyClasses, 
  findOneMyClass, 
  updateClass } from './class.controller.js';
import { validateExistClass } from './class.middleware.js';

export const router = express.Router();

router
  .route('/')
  .get(findAllMyClasses)
  .post(createClass)

//TODO: Cuando esten las relaciones utilizar el protectAccountOwener para patch y delete

router
  .route('/:id')
  .get(validateExistClass, findOneMyClass)
  .patch(validateExistClass, updateClass)
  .delete(validateExistClass, deleteClass)

