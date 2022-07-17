import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import morgan from 'morgan';
import path from 'path'
import dotenv from 'dotenv';
import { graphQLSchema } from './src/graphql';
import cors from 'cors';
import bodyParser from 'body-parser';
import { i18next, i18nextMiddleware } from '../../utils/i18n';
import { authenticationMiddleware } from './src/middleware/authentication';
import { basicAuthenticationMiddleware } from '../../utils';

dotenv.config({ path: path.resolve(`${process.env.SERVICE_NAME}Service.env`)});
require('../../utils/mongoose');
const graphQlPath = `/${process.env.SERVICE_NAME}/graphql`;

const app = express();

app.use(morgan('dev'));

app.use(
	graphQlPath,
	cors(),
	bodyParser.json(),
	authenticationMiddleware,
	basicAuthenticationMiddleware,
	i18nextMiddleware.handle(i18next),
);

const server = new ApolloServer({
	schema: graphQLSchema,
	context: ({ req }) => {
		return { req };
	}
});

server.applyMiddleware({ app, path: graphQlPath });

app.listen(process.env.PORT || 1337, () => {
	console.log(`Server listen on port ${process.env.PORT || 1337}`);
});
