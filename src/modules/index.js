import { makeExecutableSchema } from '@graphql-tools/schema'

import TypesModule from './types/index.js'
import UserModule from './user/index.js'
import AuthModule from './auth/index.js'
import PrivateModule from './private/index.js'

export default makeExecutableSchema({
    typeDefs: [
        TypesModule.typeDefs,
        UserModule.typeDefs,
        AuthModule.typeDefs,
        PrivateModule.typeDefs
    ],
    resolvers: [
        TypesModule.resolvers,
        UserModule.resolvers,
        AuthModule.resolvers,
        PrivateModule.resolvers
    ]
})