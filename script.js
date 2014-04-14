/*

############## API ##############

codepen.api.signup(user_object)
	description: to sign up a new user
	parameters: user object, which contains properties: name, email, username, password
	returns: response object

codepen.api.login(user_object)
	description: to login an existing user
	parameters: user object, which contains properties: username, password
	returns: response object


Reponse Objects:

{
	success: true/false,
	error: (string)
}


##users already signed up (can log in)
	('suzy', 'I@msoawesome')
	('conan', 'gingertastic')
	('jerry', '@#!$%@')

*/
var reg_non_alphanumeric = /[^A-Za-z0-9]/;
var reg_password = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
var reg_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


function handleResponse(response, fromFormMessage){
	if(response.success){
		$('.message').show();
		$('.message').css("color", "Green");
		$('.message').html(fromFormMessage + " successful");
		return true;
	} else {
		$('.message').show();
		$('.message').css("color", "Red");
		$('.message').html(response.error);
		return false;
	}
}

$('document').ready(function() {
	/******************************************/
	// Black Diamond - Input validation
	/******************************************/
	function validate(event){
		var validation = {
			valid: false,
			error: null
		}
		var inputValue = event.target.value;
		switch(event.target.name){
			case 'name':
				if(!inputValue) {
					validation.error = 'Please provide a name';
					return validation;
				}
				validation.success = true;
				return validation;
				break;
			case 'firstname':
				if (!inputValue) {
					validation.error = 'Please provide a first name';
					return validation;
				}
				validation.success = true;
				return validation;
				break;
			case 'lastname':
				if (!inputValue) {
					validation.error = 'Please provide a last name';
					return validation;
				}
				validation.success = true;
				return validation;
				break;
			case 'email':
				if (!inputValue) {
					validation.error = 'Please provide an email address';
					return validation;
				}
				if (!reg_email.test(inputValue)) {
					validation.error = 'Please provide a valid email address';
					return validation;
				}
				validation.success = true;
				return validation;
				break;
			case 'username':
				if (!inputValue) {
					validation.error = 'Please provide a username';
					return validation;
				}
				if (inputValue.length < 5) {
					validation.error = 'Username must be at least 5 characters';
					return validation;
				}
				if (reg_non_alphanumeric.test(inputValue)) {
					validation.error = 'Username must contain only letters and numbers';
					return validation;
				}
				validation.success = true;
				return validation;
				break;
			case 'password':
				if (!inputValue) {
					validation.error = 'Please provide a password';
					return validation;
				}
				if (inputValue.length < 5) {
					validation.error = 'Password must be at least 5 characters';
					return validation;
				}
				if (!reg_password.test(inputValue)) {
					validation.error = 'Password must contain at least one letter and one number';
					return validation;
				}
				validation.success = true;
				return validation;
				break;
			case 'passwordCheck':
				if (!inputValue) {
					validation.error = 'Please retype your password';
					return validation;
				}
				validation.success = true;
				return validation;
				break;
			default:
				validation.error = "Input field not valid";
				return validation;
				break;
		}
	}

	function printMessage(event){
		if (event.target.id.indexOf("signup") > -1) {
			var fromForm = "Signup";
		} else { var fromForm = "Login"; }
		var response = validate(event);
		if (!response.success) {
			handleResponse(response, fromForm);
		}
	}

	$('#signup-firstname-field, #signup-lastname-field, #signup-email-field, #signup-username-field, #signup-password-field').on("blur", printMessage);

	// Create user in codepen.object.User namespace
	codepen.objects = {
		user: {
			username: null,
			password: null,
			name: null,
			email: null,
			is_logged_in: false
		}
	};
	codepen.objects.newUser = Object.create(codepen.objects.user);
	codepen.objects.newUser.firstname = null;
	codepen.objects.newUser.lastname = null;
	//Initially hide the login form and show the signup form
	$('.signup-form').hide();
	//Initially hide the status message
	$('.message').hide();

	/******************************************/
	// Hide/show login and signup forms
	/******************************************/
	$('.login-form-btn').on("click", function(event){
		$('.signup-form').hide();
		$('.login-form').show();
		$(event.target).addClass("active");
		$('.signup-form-btn').removeClass("active");
		$('.message').hide();
	});

	$('.signup-form-btn').on("click", function(event){
		$('.signup-form').show();
		$('.login-form').hide();
		$(event.target).addClass("active");
		$('.login-form-btn').removeClass("active");
		$('.message').hide();
	});

	/******************************************/
	// Step 2 - Capture login event
	/******************************************/
	$('.btn-login').on("click", function(){
		//Get username and password and put into user object
		var user = Object.create(codepen.objects.user);
		user.username = $('#login-username-field').val();
		user.password = $('#login-password-field').val();
		var response = codepen.api.login(user);
		//Handle the response -- show success/failure message
		if(handleResponse(response, "Login")){
			user.is_logged_in = true;
		}
	});

	/******************************************/
	// Step 3 - Capture signup event
	/******************************************/
	$('.btn-signup').on("click", function(){
		// Check to see if passwords match
		if ($('#signup-password-field').val() != $('#signup-password-field-again').val()){
			//Clear the password input fields
			$('#signup-password-field').val("");
			$('#signup-password-field-again').val("");
			//Display the error message
			$('.message').show();
			$('.message').css("color", "Red");
			$('.message').html("Passwords do not match");
		} else {
			var user = Object.create(codepen.objects.newUser);
			user.username = $('#signup-username-field').val(); 
			user.password = $('#signup-password-field').val();
			user.firstname = $('#signup-firstname-field').val();
			user.lastname = $('#signup-lastname-field').val();
			user.email = $('#signup-email-field').val();
			var response = codepen.api.signup(user);
			handleResponse(response, "Signup");
		}
	});
});
