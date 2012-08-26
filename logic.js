function initParse() {
	Parse.initialize("DiI2NCuAUiYtho4e64vJzveX4HUQiGvzpNKAbxga", "hpT3NBz8AILn1ZEAY7fKYDCHnGUrmkIEOhw2G0rw");
};

function UserControl(){};
UserControl.prototype = {
	login : function(username, password) {
		// login code here
		Parse.User.logIn(username, password, {
			success : function(user) {
				//success log in
				//alert("user successful login: " + user.get("username"));
				window.location.href = "#main-page";
			},
			error : function(user, error) {
				//The login failed, check for the error
				$(".login-error-info").html("error: " + error.code + " " + error.message).show(3);
			}
		});
		
	}, 
	logout : function() {
		//logout code here
		Parse.User.logOut();
		window.location.href = "#login-page";
	},
	register : function(username, password, email) {
		//register code here
		var user = new Parse.User();
		user.signUp(
			{
				"username" : username,
				"password" : password,
				"email" : email
			},
			{
				success : function(user) {
					//let's use the app now.
					window.location.href="#main-page";
				},
				error : function(user, error) {
					//register failed
					alert ("error " + error.code + " " + error.message);
				} 
			}
		)
	},
	getCurrentUser : function() {
		//get the current user info
		var currentUser = Parse.User.current();
		if (currentUser) {
			//return back the current user;
			return currentUser.get("username");
		} else {
			//show the signup or login page
			return null;
		}
	}
};

function FoodUtil(){};
FoodUtil.prototype = {
	add : function(foodName, foodType, foodRate) {
		//add Food code here
		var Food = Parse.Object.extend("Food");
		var food = new Food();
		
		//set that only the current user can access to it.
		food.setACL(new Parse.ACL(Parse.User.current()));
		/**
		 * set and then save the object to the server.
		 */
		food.save({
				"foodName" : foodName,
				"foodType" : foodType,
				"foodRate" : foodRate
				
			},{
				success: function(object) {
					//The food object has been successfully uploaded into server
					/*****Following should be updated************/
					window.location.href = "#main-page";
				}, 
				error: function(object, error) {
					/**
					 * The save failed.
					 * Error is a Parse.Error with an error code and description.
					 */
					 alert("Error: " + error.code + " " + error.message);
				}
			}
		);
	},
	remove : function(foodName, foodType) {
	},
	update: function(foodName, foodType, foodRate) {
		//update the food
	},
	addComment : function(comments, foodName, foodType) {
		//add comments
	},
	queryWithType : function(foodType) {
		//query food code
		var Food = Parse.Object.extend("Food");
		var query = new Parse.Query(Food);
		query.equalTo("foodType", foodType);
		query.find({
			success : function(results) {
				var foodsCounts = results.length;
				if (foodsCounts > 0) {
					if (foodType == 1 || foodType == 2 || foodType == 3 || foodType == 4 || foodType == 5) {
						var randomInt = getRandomInt(0, foodsCounts - 1);
						$("#foods-list li").html("<li>餐厅名： " + results[randomInt].get("foodName") + "  得分: " + results[randomInt].get("foodRate") + "</li>");
					}	
				} else {
					$("#foods-list").html (" <h2>There is no suggestion!</h2>");
				}
			},
			error : function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	}
};


function initParse() {
	Parse.initialize("DiI2NCuAUiYtho4e64vJzveX4HUQiGvzpNKAbxga", "hpT3NBz8AILn1ZEAY7fKYDCHnGUrmkIEOhw2G0rw");
};

function getRandomInt(startInt, endInt) {
	return Math.round(startInt + Math.random()*(endInt - startInt));
}