import Comment from "../comment/comment.model.js";
import Guest from "../guest/guest.model.js";
import User from "../user/user.model.js";
import PublicationImg from "./publication-img.model.js";
import Publication from "./publication.model.js";

export class PublicationService {
  async findOne(id) {
    return await Publication.findOne({
      where: {
        id,
        status: true,
      },
      include: [
        {
          model: PublicationImg,
        },
        {
          model: Comment,
          include: [
            {
              model: Guest,
            },
            {
              model: User,
            },
          ],
        },
        {
          model: User,
        },
      ],
    });
  }

  async findAll() {
    return await Publication.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: PublicationImg,
        },
        {
          model: Comment,
          include: [
            {
              model: Guest,
            },
            {
              model: User,
            },
          ],
        },
        {
          model: User,
        },
      ],
    });
  }

  async create(data) {
    return await Publication.create(data);
  }

  async update(publication, data) {
    return await publication.update(data);
  }

  async delete(publication) {
    return await publication.update({ status: false });
  }

  async createPublicationsImgs(dataImgs) {
    return await PublicationImg.bulkCreate(dataImgs);
  }
}
