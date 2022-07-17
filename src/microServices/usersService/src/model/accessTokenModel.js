import mongoose, { Schema } from 'mongoose';


const tokenSchema = new Schema({
    token: String,
    owner: String,
    isActive: Boolean,
}, { timestamps: true })

const AccessTokenModel = mongoose.model('Token', tokenSchema);
export default AccessTokenModel