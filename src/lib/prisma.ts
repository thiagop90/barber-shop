import { withAccelerate } from '@prisma/extension-accelerate'

import { PrismaClient } from '@/generated/prisma/edge'

const db = new PrismaClient().$extends(withAccelerate())

export default db
