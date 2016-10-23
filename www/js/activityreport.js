// Activity Report Generator
// This Javascript is in home.html

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

setInterval(reloadArrays, 1000); 

function generateActivityTable() {
	var outputString = "<table><tr><td><center><b>Activity Number</b></center></td><td><center><b>Activity Time</b></center></td></tr>"
	for (var i = 0; i < arrayActivityCompletionTimes.length; i++)
		outputString += "<tr><td><center>" + i + "</center></td><td><center>" + arrayActivityCompletionTimes[i] + "</center></td></tr>"; 
	outputString += "</table>"; 
	return outputString;
}

function generateAccelereationTable() {
	var outputString = "<table><tr><td><center><b>Acceleration Number</b></center></td><td><center><b>Activity Value</b></center></td></tr>"
	for (var i = 0; i < arrayAcceleration.length; i+=60)
		outputString += "<tr><td><center>" + i + "</center></td><td><center>" + arrayAcceleration[i] + "</center></td></tr>"; 
	outputString += "</table>"; 
	return outputString;
}

function generateActivityTable2() {
	var outputString = "Activity Number %09 Activity Time %0D%0A"; 
	for (var i = 0; i < arrayActivityCompletionTimes.length; i++)
		outputString += "" + i + "%09" + arrayActivityCompletionTimes[i] + "%0D%0A"; 
	return outputString;
}

function generateAccelereationTable2() {
	var outputString = "Acceleration Number %09 Acceleration Value %0D%0A"; 
	for (var i = 0; i < arrayAcceleration.length; i+=60)
		outputString += i + "%09" + arrayAcceleration[i] + "%0D%0A"; 
	return outputString;
}


function generateReportEmail() {
	var emailString = generateActivityTable2();
	emailString = "mailto:?subject=Activity Report&body=" + emailString; 
	document.getElementById("emailBtn").href = emailString; 
}
generateReportEmail(); 
setInterval(generateReportEmail, 10000); 

function repaint(arrContents, cvsContent) {
	var ctx = cvsContent.getContext('2d');
	var drawHH = cvsContent.height;
	var drawWW = cvsContent.width; 
	// Clear the canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, drawWW, drawHH);
	
	// Draw Y axis
	ctx.beginPath();
    ctx.lineWidth = 1;
	ctx.moveTo(5,5);
	ctx.lineTo(5, drawHH - 10);
    ctx.strokeStyle = '#bbdefb';
    ctx.stroke();
	
	// Draw X axis
	ctx.beginPath();
    ctx.lineWidth = 1;
	ctx.moveTo(5, drawHH - 10);
	ctx.lineTo(drawWW - 10, drawHH - 10);
    ctx.strokeStyle = '#bbdefb';
    ctx.stroke();
	
	var startIndex = 0; 
	if (arrContents.length > 300) startIndex = arrContents.length - 300; 
	
	// Draw points
	// Determine X-Spacing
	var xSpacing = (drawWW - 15) / (arrContents.length - startIndex); 
	// Draw the points
	// First find out the highest point to create a relative scale. 
	
	var highest = arrContents[startIndex]; 
	for (var i = startIndex + 1; i < arrContents.length; i++) 
		if (parseInt(arrContents[i]) > highest) highest = arrContents[i]; 
	// Modify all points to correspond to the relative scale
	var arrPoints = []; 
	for (var i = startIndex; i < arrContents.length; i++) {
		arrPoints.push(parseInt(arrContents[i]) * 1 / highest * (drawHH - 40));
	}
	// Draw the lines
	for (var i = 1; i < arrPoints.length; i++) {
		var centerX = (i + 0.5) * xSpacing;
		var centerY = drawHH - 10 - arrPoints[i];
		var centerX2 = (i - 0.5) * xSpacing; 
		var centerY2 = drawHH - 10 - arrPoints[i-1]; 
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.moveTo(centerX2, centerY2);
		ctx.lineTo(centerX, centerY);
		ctx.strokeStyle = '#64b5f6';
		ctx.stroke();
	}
	// Draw the points
	for (var i = 0; i < arrPoints.length; i++) {
		var centerX = (i + 0.5) * xSpacing; 
		var centerY = drawHH - 10 - arrPoints[i]; 
		ctx.fillStyle = "#111111"; 
		ctx.beginPath();
		ctx.arc(centerX, centerY, 2, 0, 2 * Math.PI, false);
		ctx.fill();
	}
}

// Generating a graph is a two-step process: first, generate the ActivityGraph HTML code, then call the GraphScript. 
function generateActivityGraph() {
	var outString = "<center>Activity Responses</center><br /><center><canvas id='activityCanvas' width='" + innerWidth * 0.95 * 0.8 + "px' height='200px'></canvas></center>"; 
	return outString; 
}

function startActivityGraphScript() {
	eval("setInterval(function(){ repaint(arrayActivityCompletionTimes, document.getElementById('activityCanvas')); }, 1000/60);"); 
}

function generateAccGraph() {
	var outString = "<center>Device Movement</center><br /><center><canvas id='accCanvas' width='" + innerWidth * 0.95 * 0.8 + "px' height='200px'></canvas></center>"; 
	return outString; 
}

function startAccGraphScript() {
	eval("setInterval(function(){ repaint(arrayAcceleration, document.getElementById('accCanvas')); }, 1000/60);"); 
}
