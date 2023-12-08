import express from "express";
import {
  createPublication,
  deletePublication,
  findAllPublications,
  updatePublication,
} from "./publication.controller.js";
import { uploadMultiple } from "../config/plugins/upload-files.js";

export const router = express.Router();

router
  .route("/")
  .get(findAllPublications)
  .post(uploadMultiple("postImgs"), createPublication);

router.route("/:id").patch(updatePublication).delete(deletePublication);
