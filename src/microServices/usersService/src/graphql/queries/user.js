import { UserType } from '../types';
import UserModel from '../../model/user';


export const user = {
	type: UserType,
	description: 'Get profile of a User',
	resolve: async (root, args, context) => {
		const { user: authUser } = context.req,
			user = await UserModel.findById(authUser._id);
		if (!user) {
			return Promise.reject(new Error('User not found'));
		}
		return user;
	},
};
