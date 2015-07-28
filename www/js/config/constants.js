tigoApp.constant('AUTH_EVENTS',{
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized   :  'auth-not-authorized',
});

tigoApp.constant('USER_ROLES', {
	admin: 'admin_roles',
	public: 'public'
});

tigoApp.constant('SERVER_CONSTANTS', {
	host: 'http://localhost:8000',
	authMsisdnUrl : '/api/auth/msisdn/',
	authCodeUrl : '/api/auth/code/',
});