import { Static } from "@fastify/type-provider-typebox";
import { createUserSchema, updateUserSchema } from "./user.schema";

export type createUserBody = Static<typeof createUserSchema.body>;
export type updateUserBody = Static<typeof updateUserSchema.body>;
export type userQueryParams = Static<typeof updateUserSchema.params>;
