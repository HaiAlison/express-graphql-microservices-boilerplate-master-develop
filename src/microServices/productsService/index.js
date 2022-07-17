import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import morgan from 'morgan';
import path from 'path'
import dotenv from 'dotenv';
import { graphQLSchema } from './src/graphql';
import cors from 'cors';
import bodyParser from 'body-parser';
import { i18next, i18nextMiddleware } from '../../utils/i18n';
import { otherServicesAuthenticationMiddleware } from '../../utils/';
dotenv.config({ path: path.resolve(`${process.env.SERVICE_NAME}Service.env`) });

require('../../utils/mongoose');
const graphQlPath = `/${process.env.SERVICE_NAME}/graphql`;

const app = express();
console.log(process.env.PORT)
app.use(morgan('dev'));

app.use(
	graphQlPath,
	cors(),
	bodyParser.json(),
	i18nextMiddleware.handle(i18next),
	otherServicesAuthenticationMiddleware
);

const server = new ApolloServer({
	schema: graphQLSchema,
	context: ({ req }) => {
		return { req };
	}
});

server.applyMiddleware({ app, path: graphQlPath });

app.listen(process.env.PORT || 1338, () => {
	console.log(`Server listen on port ${process.env.PORT || 1338}`);
});
