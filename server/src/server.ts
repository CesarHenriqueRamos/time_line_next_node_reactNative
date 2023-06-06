import 'dotenv/config'
import fastify from "fastify";
import { memoriesRoutes } from "./routes/memories";
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart  from '@fastify/multipart';
import { authRoutes } from './routes/auth';
import { resolve } from 'path';
import { uploadRoutes } from './routes/upload';

const app = fastify();

app.register(require('@fastify/static'),{
  root:resolve(__dirname, '../uploads'),
  prefix:'/uploads'
})
app.register(multipart)
app.register(cors,{
  origin:true
})
app.register(jwt,{
  secret:'spacetime'
})

app.register(uploadRoutes)
app.register(memoriesRoutes)
app.register(authRoutes)
app
  .listen({
    port: 3333,
    host:'0.0.0.0'
  })
  .then(() => {
    console.log("running");
  });
