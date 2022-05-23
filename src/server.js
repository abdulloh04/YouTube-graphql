import {
  ApolloServerPluginDrainHttpServer,
} from 'apollo-server-core'
import { graphqlUploadExpress } from 'graphql-upload'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import http from 'http'
import '#config/index'
import path from 'path'
import schema from './modules/index.js'
import JWT from "../helpers/jwt.js"
import cors from 'cors'
import queryParser from '../helpers/queryParser.js'
import fs from 'fs'


process.HOST = 'http://localhost:4000'

!async function () {
  const app = express()
  const httpServer = http.createServer(app)

  app.use(cors())
  
  app.use(graphqlUploadExpress())
  
  app.use(express.static(path.join(process.cwd(), 'uploads')))

  app.get("/view/:fileName",  (req, res) => {
    res.sendFile(path.join(process.cwd(), 'uploads', req.params.fileName))
  })

  app.get("/download/:fileName",  (req, res) => {
    res.download(path.join(process.cwd(), 'uploads', req.params.fileName))
  })

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
    context: ({ req }) => {
      const { operation, fieldName } = queryParser(req.body)

      // const modelFunctions = model({ databasePath: path.join(path.resolve('src/database')) }) 

      if (fieldName === '__schema') return

      if ([
        'login',
        'register',
        'users',
        'videos'
      ].includes(fieldName)) {
        return {
          agent: req.headers['user-agent'],
          userIp: req.ip
        }
      }

      const TOKEN = req.headers?.token?.trim()

      if (!TOKEN) throw new Error("Token is required!")

      const { userId, agent, userIp } = JWT.verify(TOKEN)

      if (req.headers['user-agent'].trim() !== agent.trim()) throw new Error("Wrong device")

      // const permissions = modelFunctions.read('permissions')

      // const permission = permissions.find(permission => {
      //     const user = permission.userId == userId
      //     const module = query[fieldName].module == permission.permissionModule
      //     const action = query[fieldName].actions.find(name => permission[name])

      //     return user && module && action
      // })

      // if (
      //     !permission &&
      //     [
      //         'permissions'
      //     ].includes(fieldName)
      // ) {
      //     return {
      //         userId,
      //         model: modelFunctions,
      //         agent: req.headers['user-agent'],
      //         userIp: req.ip
      //     }
      // }

      // if (!permission) {
      //     throw new Error("You are not allowed!")
      // }

      return {
        agent: req.headers['user-agent'],
        userIp: req.ip,
        userId
      }
    },
  })

  await server.start()

  server.applyMiddleware({ app })

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}()