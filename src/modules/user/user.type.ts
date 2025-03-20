import { Static } from "@fastify/type-provider-typebox";
import { createUserSchema } from "./user.schema";

export type createUserBody = Static<typeof createUserSchema.body>;
