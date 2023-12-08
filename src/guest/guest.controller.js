
import { AppError, catchAsync } from "../errors/index.js"
import { GuestService } from "./guest.service.js"

const guestService = new GuestService()

export const findAllGuest = catchAsync(async(req,res,next) => {
  const guest = await guestService.findAll()

  return res.json({
    total: guest.length,
    data: guest
  })
})

export const createGuest = catchAsync(async(req,res,next) => {
  const { name, classId } = req.body;

  const guestCreated = guestService.create({name, classId})

  return res.status(201).json(guestCreated)
})

export const deleteGuest = catchAsync(async(req,res,next) => {
  const { id } = req.params;

  const guest = guestService.findById(id);

  if(!guest){
    return next(new AppError(`can't find guest with id: ${id}`))
  }

  await guestService.delete()

  return res.status(204).json(null)
})
