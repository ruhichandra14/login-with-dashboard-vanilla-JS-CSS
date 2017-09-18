//dashboard page
var recordsSection = document.getElementById("records-wrapper");
var currRowOnEdit,userPermissionFlag,saveCofirmation;

//getting the inventary records
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		inventaryRecords = JSON.parse(this.responseText);

		var table = document.createElement("table");
		table.className = "records-table";
		recordsSection.appendChild(table);
		table.border = "1";

		var row = table.insertRow(-1);
		var heading = Object.keys(inventaryRecords[0]);
		for(var i=0;i<heading.length;i++){
			var headerCell = document.createElement("th");
			headerCell.innerHTML = heading[i];
			row.appendChild(headerCell);
		}

		for(var i=0;i<inventaryRecords.length;i++){
			row = table.insertRow(-1);
			for(var j=0; j<heading.length+1; j++){
				var cell = row.insertCell(-1);
				cell.innerHTML = inventaryRecords[i][heading[j]];
			}
			cell.innerHTML = "<div class = 'option-wrapper' id =  " + i +"><input type = 'button' value='Edit' class='edit-btn btn'><input type ='button' value='Delete' class= 'delete-btn btn'></div><div class='saveBtn'><button class='btn'>Save</button></div>";
		}	
		recordOptions();
	}
};
xhttp.open("GET", "http://localhost:3000/dashboard", true);
xhttp.send();


//warning before logging out
window.onbeforeunload = function(){
	return "You are about to log out!"
}

//to prevent user to reach to dashboard once logged out
function preventBack(){window.history.forward();}
setTimeout("preventBack()", 0);
window.onunload=function(){null};


//edit records functionality
function recordOptions(){

	var trClick = document.getElementsByTagName('table');
	trClick[0].addEventListener('click',function(event){
		if(event.target.value === "Edit"){
			if( userPermissionFlag === 1 ){
				for(var j=0;j<event.target.parentNode.parentNode.parentNode.childNodes.length;j++){
					if(event.target.parentNode.parentNode.parentNode.childNodes[j].childElementCount === 0){
						event.target.parentNode.parentNode.parentNode.childNodes[j].setAttribute("contentEditable", "true");
						if(event.target.parentNode.parentNode.parentNode.childNodes[j].contentEditable === "true"){
							event.target.parentNode.parentNode.parentNode.childNodes[j].className = "editable-data";
						}
					}
				}
				//detect changes made in the current row
				currRowOnEdit = event.target.parentNode.parentNode.parentNode;
				event.target.parentNode.nextSibling.style.display="block";
				event.target.parentNode.style.display = "none";
				checkDataChange(currRowOnEdit,event.target.parentNode.nextSibling.childNodes[0],event.target.parentNode);
			}
			else{
				saveCofirmation = alert("Please consult your Store Manager to edit the records");
			}
		}
		if(event.target.value === "Delete" ){
			if( userPermissionFlag === 1 ){
				var deleteCofirmation = confirm("Want to delete?");
				if (deleteCofirmation) {
					event.target.parentNode.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode.parentNode);
				}
			}
			else{
				saveCofirmation = alert("Please consult your Store Manager to delete the records");
			}
		}
	})
}


//save the data on edit
function checkDataChange(currRowOnEdit,element,sib){
	var saveBtn = element;
	saveBtn.addEventListener("click", function(){
		if(userPermissionFlag ===1){
			saveCofirmation = confirm("Want to save?");
			for(var i=0;i<currRowOnEdit.childNodes.length; i++){
				currRowOnEdit.childNodes[i].contentEditable = "false";
			} 
		}
		saveBtn.parentNode.style.display = 'none';
		sib.style.display = 'block';
	})	
}

//checking the user role then only allowing him to save
function checkCookie(){
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf("user-role") == 0) {
            encodedString = c.substring("user-role".length, c.length);
        }
    }
	if(encodedString.indexOf("Store Manager") > -1){
		userPermissionFlag = 1;
	}
}checkCookie();

