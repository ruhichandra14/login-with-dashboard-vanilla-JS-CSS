//login Page
var inputUserName = document.getElementById("input-username");
var inputPassword = document.getElementById("input-password");
var loginBtn = document.getElementById("login-btn");
var loginForm = document.getElementById("login-form");
var loginFlag, errorFlag, errorNode;

loginBtn.addEventListener("click", function(){	
	if(inputUserName.value !== "" && inputPassword.value !== ""){
		var xhttp = new XMLHttpRequest();
	  	xhttp.onreadystatechange = function() {
	    	if (this.readyState == 4 && this.status == 200) {
	    		userData = JSON.parse(this.responseText);
	    		if(userData[inputUserName.value] && userData[inputUserName.value].password===inputPassword.value){
	    			if(errorFlag === 1 && loginForm.appendChild(errorNode)){
	    				errorNode.parentNode.removeChild(errorNode);
	    			}
	    			roleCheckCookie(userData[inputUserName.value].role);
	    			window.location.href = "http://localhost:3000/dashboard.html";	
	    		}else{
    				console.log("Login Unsuccessful");
    				if(errorFlag !== 1){
	    				errorNode = document.createElement("div");
	    				errorNode.innerHTML = "Invalid Credentails";
	    				errorNode.className = "error-msg";
	    				loginForm.appendChild(errorNode);
	    				errorFlag = 1;
    				}
	    		}
	    	}
	  	};
	  	xhttp.open("GET", "http://localhost:3000/login", true);
	  	xhttp.send();
  	}
})


//setting cookie to detect the role of user
function roleCheckCookie(userRole){
	console.log(userRole);
	document.cookie = "user-role" + "=" + userRole + ";"
}





