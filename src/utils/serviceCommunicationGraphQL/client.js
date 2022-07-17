import ApolloClient from 'apollo-boost';
import fetch from 'node-fetch';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

const isProduction = process.env.NODE_ENV === 'production' || process.env.CALL_PRODUCTION,
	baseUri = {
		users: `${process.env.USER_SERVICE_HOST}:${process.env.USER_SERVICE_PORT}`,
	},
	getUri = (serviceName) => `${isProduction ? process.env.BASE_URL : baseUri[serviceName]}/${serviceName}/graphql`;

function encodeBase64(username, password) {
	return Buffer.from(`${username}:${password}`).toString('base64');
}

export const getUsersServiceClient = () => {
	console.log(process.env.USER)
	if (!process.env.USER || !process.env.PASSWORD) {
		return null; 
	}
	const token = encodeBase64(process.env.USER, process.env.PASSWORD);
	console.log(process.env.USER,'>>>', process.env.PASSWORD, token)
	return new ApolloClient({
		uri: getUri('users'),
		headers: {
			'Authorization': 'Basic ' + token,
		},
		cache: new InMemoryCache({
			fragmentMatcher: new IntrospectionFragmentMatcher({
				introspectionQueryResultData: {
					__schema: {
						types: [],
					},
				},
			}),
		}),
		fetch,
	});
};

