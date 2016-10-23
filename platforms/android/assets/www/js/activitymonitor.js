// Activity Moniter JS 
// This Javascript is placed in Index.html. 

// Create two arrays
// Update arrays periodically
// Update localStorage periodically. 

var arrayActivityCompletionTimes = []; 
var arrayAcceleration = []; 

function reloadArrays() {
	var str1 = localStorage.getItem("com.kaellel.unforgetimals.arrActivity"); 
	if (str1==null || str1=="null" || str1=="") return; 
	arrayActivityCompletionTimes = str1.split(","); 
	
	var str2 = localStorage.getItem("com.kaellel.unforgetimals.arrAcc"); 
	if (str2==null || str2=="null" || str2=="") return; 
	arrayAcceleration = str2.split(","); 
}

reloadArrays(); 

// ***************** Quest Monitor ********************
var prevQuest = "false"; 
var startTime; 
var endTime; 

setInterval(detectSrcChange, 100); 
function detectSrcChange() {
	var isQuest = localStorage.getItem('com.kaellel.unforgetimals.isQuest'); 
	if (prevQuest != isQuest) {
		
		prevQuest = isQuest; 
		if (isQuest == 'false'){
			// Returning from a quest
			var date = new Date();
			var time = date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
			endTime = time; 
			var deltaTime = endTime - startTime; 
			arrayActivityCompletionTimes.push(deltaTime); 
			if (arrayActivityCompletionTimes.length > 10) arrayActivityCompletionTimes.splice(0, 1); 
			localStorage.setItem("com.kaellel.unforgetimals.arrActivity", arrayActivityCompletionTimes); 
		} else {
			// Entering a quest from a home
			var date = new Date();
			var time = date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
			startTime = time;
		}
	}
	
}

// ***************** Device Movement Monitor ********************
// Set up accelerometer listeners 
/*
setTimeout(onDeviceReady, 1000); 
 
function onDeviceReady() {
	setInterval(updateAcc, 500); 
}

function updateAcc() {
	if (localStorage.getItem("com.kaellel.unforgetimals.onoff") == 'on') 
		navigator.accelerometer.getCurrentAcceleration(onSuccess, function(){alert("error"); });
}

function onSuccess(a) {
	// Determine motion
	var currentAX = Math.abs(a.x); 
	var currentAY = Math.abs(a.y); 
	var currentAZ = Math.abs(a.z); 
	localStorage.setItem("com.kaellel.unforgetimals.accX", a.x);
	localStorage.setItem("com.kaellel.unforgetimals.accY", a.y);
	localStorage.setItem("com.kaellel.unforgetimals.accZ", a.z);	
	var sAcc = currentAX + currentAY + currentAZ; 
	arrayAcceleration.push(sAcc); 
	if (arrayAcceleration.length > 3600) arrayAcceleration.splice(0, 1); 
	localStorage.setItem("com.kaellel.unforgetimals.arrAcc", arrayAcceleration); 
}
*/