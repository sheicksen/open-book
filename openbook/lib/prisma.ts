// lib/prisma.ts
// Singleton Prisma client — prevents exhausting DB connections in development
// due to Next.js hot-reloading creating multiple instances.

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
