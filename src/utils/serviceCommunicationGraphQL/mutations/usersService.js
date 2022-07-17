import { verifyToken } from '../../graphQLMutations';
import { getUsersServiceClient } from '../client';

const client = getUsersServiceClient();

export const verifyTokenInUserService = (token) => {
	return client.mutate({
		mutation: verifyToken,
		variables: { token },
	});
};
