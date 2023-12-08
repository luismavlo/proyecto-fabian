import Guest from "./guest.model.js";

export class GuestService {

  async create(data){
    return await Guest.create(data)
  }

  async findById(id){
    return await Guest.findOne({
      where: { id }
    })
  }

  async findAll(){
    return await Guest.findAll()
  }

  async delete(guest){
    return await guest.destroy()
  }

}