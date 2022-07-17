import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
    product_name: String,
    product_date: Date,
    userId: String,
}, {timestamps: true})

const ProductModel = mongoose.model('Product', productSchema)
export default ProductModel