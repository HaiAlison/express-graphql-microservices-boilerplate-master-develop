import { GraphQLObjectType } from 'graphql';
import { GraphQLString as String } from 'graphql/type/scalars';
import { basicAuthenticationMiddleware, middlewareResolver } from '../../../../../utils';
import { isAuthenticated } from '../../../../productsService/src/graphql/middleware';
import { isBasicAuthenticated } from '../middleware'
import { signUp, signIn, verifyToken } from './auth';

export default new GraphQLObjectType({
	name: 'Mutations',
	fields: () => ({
		[`${process.env.SERVICE_NAME}Greeting`]: greeting,
		signUp,
		signIn,
		verifyToken: middlewareResolver(verifyToken, [isBasicAuthenticated]),
		
	}),
});

const greeting = {
	type: String,
	description: 'A warm welcome message from GraphQL, usually used to Test if the system working..',
	resolve: (rootValue, params, context) => {
		const { req } = context;
		return req.t('greetingMutation', { service: process.env.SERVICE_NAME });
	},
};
