import { ProductType } from "../types";
import { Primitives, Resolvers } from '../../../../../utils';
import ProductModel from '../../model/product'
export const newProduct = {
    type: ProductType,
    description: 'Create new product',
    args: {
        product_name: Primitives.requiredString(),
        product_date: Primitives.string(),
    },
    resolve: async (rootValue, { product_name, product_date }, { req }) => {
        try {
            console.log(req)
            if (!req.user) {
                return new Error("Invalid token")
            }
            else {
                const newProduct = await new ProductModel({
                    product_name,
                    product_date,
                    userId: req.user._id
                }).save()
                return {
                    newProduct
                }
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

export const updateProduct = {
    type: ProductType,
    description: 'Update product',
    args: {
        id: Primitives.requiredString(),
        product_name: Primitives.string(),
        product_date: Primitives.string(),
    },
    resolve: async (root, args, { req }) => {
        try {
            const updatedProduct = await ProductModel.findById(args.id, args)
            if (!updatedProduct) {
                return new Error("Product not found")
            }
            return updatedProduct
        } catch (error) {
            return error
        }
    }
}