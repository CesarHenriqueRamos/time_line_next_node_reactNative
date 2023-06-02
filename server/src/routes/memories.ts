import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import {z} from 'zod'
import { request } from "https";

export async function memoriesRoutes(app: FastifyInstance){
  //routes

app.get("/memories", async () => {
  const memories = await prisma.memory.findMany({
    orderBy:{
      createAt:'asc'
    }
  })
  return memories.map(memory =>{
    return {
      id:memory.id,
      coverUrl: memory.coverUrl,
      excerpt: memory.content.substring(0,115).concat('...')
    }
  });
});

app.get("/memories/:id", async (request) => {
  const paramsSchema = z.object({
    id:z.string().uuid()
  })

  const {id} = paramsSchema.parse(request.params)

  const memory = await prisma.memory.findUniqueOrThrow({
    where:{
      id
    }
  })

  return memory
});

app.post("/memories", async (request) => {
  const bodySchema = z.object({
    content:z.string(),
    coverUrl: z.string(),
    isPublic: z.coerce.boolean().default(false)
  })

  const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

  const memory = prisma.memory.create({
    data:{
      content,
      coverUrl,
      isPublic,
      userId: 'de86c8c6-c59e-4c81-bd58-495394e1ed6f'
    }
  })

  return memory
});

app.put("/memories/:id", async (request) => {
  const bodySchema = z.object({
    content:z.string(),
    coverUrl: z.string(),
    isPublic: z.coerce.boolean().default(false)
  })
  const paramsSchema = z.object({
    id:z.string().uuid()
  })
  const { content, coverUrl, isPublic } = bodySchema.parse(request.body)
  const {id} = paramsSchema.parse(request.params)

  const memory = await prisma.memory.update({
    where:{
      id
    },
    data:{
      content,
      coverUrl,
      isPublic
    }
  })

  return memory
});

app.delete("/memories/:id", async (request) => {
  const paramsSchema = z.object({
    id:z.string().uuid()
  })

  const {id} = paramsSchema.parse(request.params)

  await prisma.memory.delete({
      where:{
        id
      }
    })
});
}