import { generateUUID } from "../config/plugins/uuid.plugin.js";
import { catchAsync } from "../errors/index.js"
import { ClassService } from "./class.service.js";

const classService = new ClassService()

export const findAllMyClasses = catchAsync(async(req, res, next) => {
  const { id } = req.sessionUser;

  const myClasses = await classService.findAllMyClasses(id)
  
  return res.status(200).json(myClasses)
});

export const createClass = catchAsync(async(req, res, next) => {
  const { title, description } = req.body;
  const { id } = req.sessionUser;

  const newClass = await classService.create({
    title: title,
    description: description,
    code: generateUUID(),
    userId: id
  })

  return res.status(201).json(newClass)
});

export const findOneMyClass = catchAsync(async(req, res, next) => {
  const { classFoundIt } = req;

  return res.status(200).json(classFoundIt)
});

export const deleteClass = catchAsync(async(req, res, next) => {
  const { classFoundIt } = req;

  await classService.deleteClass(classFoundIt);

  return res.status(204).json(null)
});

export const updateClass = catchAsync(async(req, res, next) => {
  const { classFoundIt } = req;
  const { title, description } = req.body;

  await classService.updateClass(classFoundIt, { title, description });

  return res.status(200).json({
    message: 'class has been updated'
  })
});
