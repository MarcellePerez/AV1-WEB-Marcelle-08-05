import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/index.js";

const adapter = new PrismaMariaDb({
  url: process.env.DATABASE_URL
});
const prisma = new PrismaClient({ adapter });

export { prisma };