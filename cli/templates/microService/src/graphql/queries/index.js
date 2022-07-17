import { GraphQLObjectType, GraphQLString as String, } from 'graphql';

export default new GraphQLObjectType({
	name: 'Queries',
	fields: () => ({
		[`${process.env.SERVICE_NAME}Greeting`]: greeting
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
