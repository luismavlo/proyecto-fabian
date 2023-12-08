import { AppError, catchAsync } from "../errors/index.js"
import { CommentService } from "./comment.service.js";

const commentService = new CommentService()

export const createComment = catchAsync(async(req,res,next) => {
  const { comment, userId, guestId, publicationId } = req.body;

  const newComment = await commentService.create({ comment, userId, guestId, publicationId })

  return res.status(201).json(newComment)
})
export const deleteComment = catchAsync(async(req,res,next) => {
  const { id } = req.params;

  const comment = await commentService.findOne(id)

  if(!comment){
    return next(new AppError('comment not found'))
  }

  await commentService.delete(comment)

  return res.status(204).json(null)
})