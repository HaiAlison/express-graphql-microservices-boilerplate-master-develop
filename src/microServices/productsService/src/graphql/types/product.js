import { GraphQLObjectType } from "graphql";
import { Resolvers } from "../../../../../utils";

export const ProductType = new GraphQLObjectType({
    name: 'Product',
    description: 'Product type',
    fields: () => ({
        id: Resolvers.id(),
        product_name: Resolvers.string(),
        product_date: Resolvers.datetime(),
        createdAt: Resolvers.datetime(),
    })
})