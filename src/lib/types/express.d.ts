import { UserModelTypes } from "../../module/auth/auth.schema";

declare global {
  namespace Express {
    interface Request {
      user?: HydratedDocument<UserModelTypes>;
    }
  }
}

export {};
