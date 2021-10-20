/**
 * Returned if there is an error in our yaml (like an example object that has the wrong type in it)
 */
const validationFail = (context, req, res) => res.status(400).json({
	message: 'Validation failed',
	data: context.validation.errors
});

/**
 * 404 is returned for any url not defined in our api yaml
 */
const notFound = (c, req, res) => res.status(404).json({
	message: 'Route not found'
});

export { validationFail, notFound };