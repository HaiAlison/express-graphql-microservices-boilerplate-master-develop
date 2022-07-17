import { GraphQLObjectType, GraphQLString as String, } from 'graphql';
import { isAuthenticated } from '../../../../../utils/middleware';
import { middlewareResolver } from '../../../../../utils';
import {getProduct} from './product'

export default new GraphQLObjectType({
	name: 'Queries',
	fields: () => ({
		[`${process.env.SERVICE_NAME}Greeting`]: greeting,
		product: getProduct
	}),
});

const greeting = {
	type: String,
	description: 'A warm welcome message from GraphQL, usually used to Test if the system working..',
	resolve: (rootValue, params, context) => {
		const { req } = context;
		return req.t('greetingQuery', { service: process.env.SERVICE_NAME });
	},
};
