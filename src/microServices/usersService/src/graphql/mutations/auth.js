import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Primitives } from '../../../../../utils';
import { AccessTokenType, UserType } from '../types';
import UserModel from '../../model/user';
import AccessTokenModel from '../../model/AccessTokenModel';
import { token } from 'morgan';

export const signIn = {
	type: AccessTokenType,
	description: 'Sign in an user',
	args: {
		email: Primitives.requiredString(),
		password: Primitives.requiredString()
	},
	resolve: async (rootValue, { email, password }, { req }) => {
		try {
			const user = await UserModel.emailExist(email);
			if (!user) {
				return Promise.reject(new Error(req.t('wrongCredential')));
			}
			const comparePassword = await user.comparePassword(password);
			if (!comparePassword) {
				return Promise.reject(new Error(req.t('wrongCredential')));
			}
			const accessToken = jwt.sign(
				{ userId: user._id },
				process.env.JWT_SECRET,
				{ expiresIn: process.env.JWT_EXPIRATION }
			),
			newToken = await new AccessTokenModel({
				token: accessToken,
				isActive: true,
				owner: user._id
			}).save();
			return {
				accessToken
			}
		} catch (e) {
			return Promise.reject(e);
		}
	}
};

export const signUp = {
	type: AccessTokenType,
	description: 'Sign up an user',
	args: {
		email: Primitives.requiredString(),
		password: Primitives.requiredString()
	},
	resolve: async (rootValue, { email, password }, { req }) => {
		try {
			const user = await UserModel.emailExist(email);
			if (user) {
				return Promise.reject(new Error(req.t('emailTaken')));
			}
			const hash = bcrypt.hashSync(password, 10),
				newUser = await new UserModel({
					email,
					password: hash,
				}).save(),

				accessToken = jwt.sign(
					{ userId: newUser._id },
					process.env.JWT_SECRET,
					{ expiresIn: process.env.JWT_EXPIRATION }
				);
			return {
				accessToken
			}
		} catch (e) {
			return Promise.reject(e);
		}
	}
};
export const verifyToken = {
	type: UserType,
	description: 'Verify token',
	args: {
		token: Primitives.requiredString(),
	},
	resolve: async (rootValue, { token }, { req }) => {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			console.log(decoded)
			if (!decoded) {
				return new UserInputError(req.t('invalidToken'));
			}
			const foundToken = await AccessTokenModel.findOne({ token: token, isActive: true });
			if (!foundToken) {
				return new UserInputError(req.t('invalidToken'));
			} 
			else {
				const user = await UserModel.findById(foundToken.owner);
				if (!user) {
					return new UserInputError(req.t('userNotFound'));
				}
				return user;
			}
		} catch (e) {
			console.log(e)
			return Promise.reject(e);
		}
	},
};