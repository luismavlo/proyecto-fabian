import { AppError, catchAsync } from "../errors/index.js";
import { ClassService } from "./class.service.js";

const classService = new ClassService()

export const validateExistClass = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const classFoundIt = await classService.findOneClass(id)

  if(!classFoundIt){
    return next(new AppError('class not found', 404))
  }

  req.classFoundIt = classFoundIt;
  next()
})