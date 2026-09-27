import { Router } from "express";
import { AuthorizeMiddleWare } from "../../lib/middleware/authorize";
import { Upload } from "../../lib/helper/multerConfig";
import { UploadFile, UploadFiles } from "./upload.controller";

const UploadRouter = Router();

UploadRouter.post(
  "/import",
  Upload.single("file"),
  AuthorizeMiddleWare,
  UploadFile,
);

UploadRouter.post(
  "/multy-import",
  Upload.array("files", 5),
  AuthorizeMiddleWare,
  UploadFiles,
);

export default UploadRouter;
