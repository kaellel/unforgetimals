// Quest Trigger JS
// This Javascript is placed in home.html. 

// Call a schedule quest. 
function scheduleQuest() {
	if (localStorage.getItem("com.kaellel.unforgetimals.onoff") == "off") return; 
	// The following line of code ensures a minumum of one minute in between quests. 
	setTimeout(questTimeTrigger, 60000);		
}

// Auxiliary function for schedule quest. 
function questTimeTrigger() {		
	// Random timeout in between quests
	var time = Math.random() * 30 * 1000 * 60 + 25 * 1000 * 60;
	// Schedule a random quest. 
	setTimeout(function() {
		questTrigger(Math.floor(Math.random() * 6)); 
	}, time);
}

// Initiate a random quest, called by questTimeTrigger(). 
// val = {0 - 4}: NFC interaction based quests. 
// val = {5}    : Accelerometer based rocking quest. 
function questTrigger(val) {
	// Navigate contentContainer to the correct Quest page. 
	
	if (val==0) {
		location = "quest.html?q=NFC&val=" + val; 
	} else if (val==1) {
		location = "quest.html?q=NFC&val=" + val; 
	} else if (val==2) {
		location = "quest.html?q=NFC&val=" + val; 
	} else if (val==3) {
		location = "quest.html?q=NFC&val=" + val; 
	} else if (val==4) {
		location = "quest.html?q=NFC&val=" + val; 
	} else if (val==5) {
		location = "quest.html?q=ACC&val=" + val; 
	}
}

scheduleQuest(); 