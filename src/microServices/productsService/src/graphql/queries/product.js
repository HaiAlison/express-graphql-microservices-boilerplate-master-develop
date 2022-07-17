import { async } from 'crypto-random-string';
import { ProductType } from '../types';
import ProductModel from '../../model/product'
import { Primitives } from '../../../../../utils';
import { GraphQLList } from 'graphql';

export const getProduct = {
    type: ProductType,
    description: 'Get all products',
    args: {
        id: Primitives.requiredString()
    },
    resolve: async (root, args, context) => {
        const product = await ProductModel.findById(args.id)
        if (!product) {
            return Promise.reject(new Error("Product not found"))
        }
        return product
    }
}