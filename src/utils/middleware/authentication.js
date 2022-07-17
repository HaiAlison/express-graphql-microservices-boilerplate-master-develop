import { verifyTokenInUserService } from '../serviceCommunicationGraphQL/mutations/usersService'
import jwt, { verify } from 'jsonwebtoken'


export async function otherServicesAuthenticationMiddleware(req, res, next) {
	try {
		const { headers: { authorization } } = req;
		let user;
		if (!authorization) {
			return next();
		}
		const accessToken = authorization.split(' ')[1];
		// Verify token
		const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
		if (!decoded) {
			return next();
		}
		const { errors, data: { verifyToken } } = await verifyTokenInUserService(accessToken);
		console.log(verifyToken)
		if (errors) {
			console.log(errors);
			return next();
		}
		if (verifyToken) {
			user = verifyToken;
		}
		if (user) {
			Object.assign(req, {
				user: user,
				accessToken,
			});
			return next();
		}
		return next();
	} catch (e) {
		console.log(e)
		return next();
	}
}
export async function basicAuthenticationMiddleware(req, res, next) {
	try {
		const { headers: { authorization } } = req;
		if (!authorization) {
			return next();
		}
		const authUser = basicAuth(req);
		console.log(authUser)
		if (authUser && authUser.name === process.env.USERNAME && authUser.pass === process.env.PASSWORD) {
			req.basicAuthenticated = true;
		}
		next();
	} catch (e) {
		return next();
	}
}