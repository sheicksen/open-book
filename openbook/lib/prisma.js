// lib/prisma.ts
// Singleton Prisma client — prevents exhausting DB connections in development
// due to Next.js hot-reloading creating multiple instances.

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma = new PrismaClient({ adapter });
