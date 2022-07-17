export const isAuthenticated = (root, args, context) => {
	if (!context.req.user) {
		return new Error('Not authenticated')
	}
};

export const isBasicAuthenticated = (root, args, context) => {
	if (!context.req.basicAuthenticated) {
		return new Error('Not basic authenticated')
	}
};
