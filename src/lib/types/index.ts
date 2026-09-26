import z from "zod";

const bearerTokenToJwt = z.codec(
  z.templateLiteral(["Bearer ", z.jwt()]),
  z.jwt(),
  {
    decode: (value) => value.split(" ")[1],
    encode: (v) => `Bearer ${v}` as `Bearer ${string}`, // explicit cast
  },
);

export const HeadersSchema = z.object({
  Authorization: bearerTokenToJwt,
});
