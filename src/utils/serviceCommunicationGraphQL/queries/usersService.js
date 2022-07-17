import { getUserById, getUsersByConditions, checkUserPermission, getBrokerById, getCompanyById, getCompanyByIdForProduct } from '../../graphQLQueries';
import { getUsersServiceClient } from '../client';

const client = getUsersServiceClient();

export const getUsersInfoByConditions = (conditions) => {
	return client.query({
		query: getUsersByConditions,
		variables: { conditions },
	});
};

export const getUserInfoById = (id) => {
	return client.query({
		query: getUserById,
		variables: { id },
		fetchPolicy: 'network-only',
	});
};

export const checkPermissionOfUser = (userId, action) => {
	return client.query({
		query: checkUserPermission,
		variables: { userId, action },
	});
};

export const getBrokerInfoById = (id) => {
	return client.query({
		query: getBrokerById,
		variables: { id },
	});
};

export const getCompanyInfoById = (type, id) => {
	return client.query({
		query: getCompanyById,
		variables: { type, id },
	});
};

export const getCompanyInfoByIdForProduct = (id, limit, page) => {
	return client.query({
		query: getCompanyByIdForProduct,
		variables: { id, limit, page },
	});
};
