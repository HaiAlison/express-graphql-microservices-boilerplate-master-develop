import mongoose from 'mongoose';

const DB_NAME = process.env.DB_NAME || `${process.env.SERVICE_NAME}_service`;

mongoose
	.connect(`mongodb://127.0.0.1:27017`, {useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 5000})
	.catch(console.log);

mongoose.connection.on('open', () => console.log('Mongo DB connected'));
