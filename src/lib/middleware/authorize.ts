import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../../module/auth/auth.model";

interface TokenPayload extends JwtPayload {
  id: string;
}

export const AuthorizeMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorization = req?.headers?.authorization;
    if (!authorization?.length) {
      return res.status(401).json({
        message: "please login",
      });
    }

    const [bearer, token] = authorization?.split(" ");

    if (!bearer || bearer !== "Bearer" || !token) {
      return res.status(401).json({
        message: "please login",
      });
    }
    const secret = process.env.JWT_SECRET!;
    const verify = jwt.verify(token, secret) as TokenPayload;
    const ExsitsUser = await UserModel.findById(verify.id);
    if (!ExsitsUser)
      return res.status(401).json({
        message: "please login",
      });
    req.user = ExsitsUser;
    next();
  } catch (error) {
    next(error);
  }
};
