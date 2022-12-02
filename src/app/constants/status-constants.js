// STATUS
export const STATUS_CODES = {
	// success
	SUCCESS: 200,
	CREATED: 201,
	SUCCESS_NO_CONTENT: 204,
	// error
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	NOT_FOUND: 404,
	FORBIDDEN: 403,
	VALIDATION_ERROR: 422,
	CONFLICT: 409
}

// SUCCESS AND ERROR
export const SUCCESS_MSG = {
	SUCCESS_TITLE: 'Success!',
	REGISTER_SUCCESS: 'Successfully registered!'
}

export const ERROR_MSG = {
	EM100: 'Failed to create user',
	INTERNAL_ERROR_TITLE: 'Something went wrong!',
	INTERNAL_ERROR_MSG: 'Please contact your administrator.',
	INTERNAL_ERROR: 'Something went wrong! Please contact your administrator.',
	AUTH_SERVICE_400_MSG: 'Invalid email or password, please try again!',
	AUTH_SERVICE_401_MSG: 'Sorry your request could not be processed',
}
