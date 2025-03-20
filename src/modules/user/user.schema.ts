import { Type } from "@fastify/type-provider-typebox";

export const createUserSchema = {
  body: Type.Object({
    emp_code: Type.String(),
    password: Type.String(),
  }),
  response: {
    201: Type.Object({
      id: Type.Number(),
      emp_code: Type.String(),
      password: Type.String(),
    }),
    500: Type.Any(),
  },
};
