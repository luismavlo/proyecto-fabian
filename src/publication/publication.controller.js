import { AppError, catchAsync } from "../errors/index.js";
import { PublicationService } from "./publication.service.js";
import { UploadFileService } from "./../common/services/upload-file-cloud.service.js";
import { generateUUID } from "../config/plugins/uuid.plugin.js";

const publicationService = new PublicationService();

export const findAllPublications = catchAsync(async (req, res, next) => {
  const publications = await publicationService.findAll();

  return res.status(200).json(publications);
});

export const createPublication = catchAsync(async (req, res, next) => {
  const { title, description, classId, userId } = req.body;

  const uuid = generateUUID();

  const newPublication = await publicationService.create({
    title: title,
    description: description,
    classId: classId,
    userId: userId,
  });

  const urls = await UploadFileService.uploadMultipleFilesToFirebase(
    "posts",
    req.files,
    uuid
  );

  const pubImgsToCreate = [];

  urls.forEach((url) => {
    pubImgsToCreate.push({
      url: url,
      publicationId: newPublication.id,
    });
  });

  await publicationService.createPublicationsImgs(pubImgsToCreate);

  return res.status(201).json(newPublication);
});

export const updatePublication = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const publication = await publicationService.findOne(id);

  if (!publication) {
    return next(new AppError("publication not found"));
  }

  await publicationService.update(publication, { title, description });

  return res.status(200).json({
    message: "the publication has been updated!",
  });
});

export const deletePublication = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const publication = await publicationService.findOne(id);

  if (!publication) {
    return next(new AppError("publication not found"));
  }

  await publicationService.delete(publication);

  return res.status(204).json(null);
});
