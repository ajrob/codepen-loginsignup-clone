var reg_non_alphanumeric = /[^A-Za-z0-9]/;
var reg_password = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
var reg_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var users = [
	{
		username: 'suzy',
		password: 'I@msoawesome'
	},
	{
		username: 'conan',
		password: 'gingertastic'
	},
	{
		username: 'jerry',
		password: '@#!$%@'
	}
];

codepen.api.signup = function(user) {

	var response = {
		success: false,
		error: ''
	}

	users.push(user);
	response.success = true;
	return response;
}

codepen.api.login = function(user) {

	var response = {
		success: false,
		error: ''
	}

	if (!user.username) {
		response.error = 'Please provide a username';
		return response;
	}
	if (!user.password) {
		response.error = 'Please provide a password';
		return response;
	}

	$.each(users, function(index, stored_user) {
		if (user.username == stored_user.username && user.password == stored_user.password) {
			response.success = true;
			response.error = '';
			return false;
		}
		response.error = 'No user found by that username/password';
	});
	return response;
}

codepen.objects = {};