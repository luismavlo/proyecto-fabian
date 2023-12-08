import Class from "./class.model.js";


export class ClassService {

  async create(data){
    return await Class.create(data)
  }

  async findAllMyClasses(id){
    return await Class.findAll({
      where: {
        status: true,
        userId: id
      }
    })
  }

  async findOneClass(id){
    return await Class.findOne({
      where: {
        status: true,
        id: id
      }
    })
  }

  async updateClass(classToUpdate, data){
    return await classToUpdate.update(data)
  }

  async deleteClass(classToDelete){
    return await classToDelete.update({ status: false })
  }

}