tigoApp.constant('AUTH_EVENTS',{
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized   :  'auth-not-authorized',
});

tigoApp.constant('USER_ROLES', {
	admin: 'admin_roles',
	public: 'public'
});

tigoApp.constant('SERVER_CONSTANTS', {
	host: 'http://10.138.81.30/index.php',
	authMsisdnUrl : '/api/auth/msisdn/',
	authCodeUrl : '/api/auth/code/',
});