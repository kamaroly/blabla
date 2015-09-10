tigoApp.constant('AUTH_EVENTS',{
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized   :  'auth-not-authorized',
});

tigoApp.constant('USER_ROLES', {
	admin: 'admin_roles',
	public: 'public'
});

tigoApp.constant('SERVER_CONSTANTS', {
	host: 'http://41.138.83.30/index.php',
	authMsisdnUrl : '/api/auth/msisdn/',
	authCodeUrl : '/api/auth/code/',
	mfsPaymentUrl: '/api/payments/mfs/', //Example : payments/mfs/{msisdn}/{amount}/{code}/{company}
	airtimeProductsUrl: '/api/payments/airtime/' //Example : /payments/airtime/{msisdn}/{code}
});