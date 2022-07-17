export const isAuthenticated = (root, args, context) => {
	console.log(context.req.user)
	if (!context.req.user) {
		return new Error('Not authenticated')
	}
};

export const isBasicAuthenticated = (root, args, context) => {
	if (!context.req.basicAuthenticated) {
		return new Error('Not Basic authenticated')
	}
};
