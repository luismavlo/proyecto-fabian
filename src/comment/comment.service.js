import Comment from "./comment.model.js";


export class CommentService {

  async findAll(){
    return await Comment.findAll({
      where: {
        status: true
      }
    })
  }

  async findOne(id){
    return await Comment.findOne({
      where: {
        id,
        status: true
      }
    })
  }

  async create(data){
    return await Comment.create(data)
  }

  async delete(comment){
    return await comment.update({ status: false })
  }

}