import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { JWT_SECRET } from "./env.js";
import { UserModel } from "@/modules/user/user.model.js";

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          if (!req?.cookies) return null;
          return req.cookies.accessToken || null;
        },
      ]),
      secretOrKey: JWT_SECRET as string,
    },
    async (payload, done) => {
      try {
        if (!payload?.userId) {
          return done(null, false);
        }

        const user = await UserModel.findById(payload.userId)
          .select("_id email")
          .lean();

        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

export const passportAuthenticateJwt = passport.authenticate("jwt", {
  session: false,
});
