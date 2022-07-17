import { GraphQLObjectType } from 'graphql';
import { Resolvers } from '../../../../../utils';

export const UserType = new GraphQLObjectType({
	name: 'User',
	description: 'Single User Type',
	fields: () => ({
		id: Resolvers.id(),
		email: Resolvers.string(),
		createdAt: Resolvers.datetime(),
		updatedAt: Resolvers.datetime(),
	})
});
