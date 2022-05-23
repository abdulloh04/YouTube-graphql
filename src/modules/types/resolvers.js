import { GraphQLUpload } from 'graphql-upload'

export function AuthResponse(status, message, data = null, token = null) {
    return {status, message, data, token}
}

export function Response(status, message, data = null){
    return {status, message, data}
}

export default {
    SortOptions: {
        toLargest: 2,
        toSmallest: 1
    },

    Upload: GraphQLUpload
}