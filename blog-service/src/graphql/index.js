import {mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge"

import {userTypeDefs} from "./userTypeDefs.js"
import {userResolvers} from "./userResolvers.js"
import blogTypeDefs from "./blogTypeDefs.js"
import blogResolvers from "./blogResolvers.js"

const typeDefs = mergeTypeDefs([userTypeDefs, blogTypeDefs])

const resolvers = mergeResolvers([userResolvers, blogResolvers])

export {typeDefs, resolvers}
