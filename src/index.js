import express from 'express';
import morgan from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import { getIntrospectSchema } from './utils';
import cors from 'cors';
import bodyParser from 'body-parser';
import { mergeSchemas } from 'graphql-tools';
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import dotenv from 'dotenv';

const apiGatewayQuery = new GraphQLObjectType({
	name: 'Queries',
	fields: () => ({
		greeting: {
			type: GraphQLString,
			description: 'A warm welcome message from GraphQL, usually used to Test if the system working..',
			resolve: () => {
				return "Congratulation! You've been connected to your GraphQL server"
			},
		}
	}),
});

const graphQLSchema = new GraphQLSchema({ query: apiGatewayQuery });

dotenv.config();

(async function () {
	const app = express();

	app.use(morgan('dev'));
	try {
		console.log(process.env.SERVICES);
		const servicesList = JSON.parse(process.env.SERVICES || '[]'),
			serviceSchemas = await Promise.all(servicesList.map((serviceName) => getIntrospectSchema(serviceName)));

		const mergedSchemas = mergeSchemas({
				schemas: [
					graphQLSchema,
					...serviceSchemas
				]
			});
		const server = new ApolloServer({
			schema: mergedSchemas,
			context: ({ req, res }) => {
				return { req, res };
			}
		});
		app.use(
			'/graphql',
			cors(),
			bodyParser.json()
		);
		server.applyMiddleware({ app });
		app.listen(process.env.PORT || 3006, () => {
			console.log(`Server listen on port ${process.env.PORT || 3006}`);
		});
	} catch (e) {
		console.log('ERROR: Failed to grab introspection queries', e);
	}
})();
