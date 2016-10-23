// *****************************************************************************************************
// *****************************************************************************************************
// *****************************************************************************************************
// *****************************************************************************************************

// Quest Handler JS
// This Javascript is placed in quest.html

function parseURL(val) {
    var result = "Invalid Input Parameters",
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

// First distinguish between quest types
// Quest Type: NFC or ACC
var questType = parseURL("q"); 
// Quest Number: the item to seek when q = NFC
var questNumber = parseURL("val"); 
// Retrieves the tag information to detect in NFC events 
function getTagRequired(){
	switch (parseInt(questNumber)) {
		case 0: 
			return localStorage.getItem("com.kaellel.unforgetimals.careobject1"); 
			break; 
		case 1:
			return localStorage.getItem("com.kaellel.unforgetimals.careobject2"); 
			break; 
		case 2:
			return localStorage.getItem("com.kaellel.unforgetimals.foodobject1"); 
			break; 
		case 4:
			return localStorage.getItem("com.kaellel.unforgetimals.foodobject2"); 
			break; 
		case 5:
			return localStorage.getItem("com.kaellel.unforgetimals.toyobject1"); 
			break; 
	}
}
var questTagRequired = getTagRequired();
if (questType=="NFC") {
	var qTitle = document.getElementById("QuestTitle");
	var qDescription = document.getElementById("QuestDesc");
	qTitle.innerHTML = "Locate Item"; 
	qDescription.innerHTML = "Place NFC tagged item " + questTagRequired + " in proximity to the animal. "; 
} else {
	var qTitle = document.getElementById("QuestTitle");
	var qDescription = document.getElementById("QuestDesc");
	qTitle.innerHTML = "Rock Animal"; 
	qDescription.innerHTML = "Gently rock animal for multiple times. "; 
}



// Second set a failure timer
var failureTimer = setTimeout(onFail, 5 * 60 * 1000);
var accWatch; 	

// Upon failure, return to homepage. A script in index.html will detect changes in location and will determine success/failure. 
function onFail(){
	location = "home.html"; 
}

// Play Sounds, Timers to Play Sounds and Feedback
// INSERT CODE TO DISPLAY AUDIBLE AND VIBRATION CUES

// Set up quest listeners 
document.addEventListener('deviceready', onDeviceReady, false); 

function onDeviceReady() {
	playAnimalSound(SOUND_ANNOYED); 
	if (questType=="NFC") {
		nfc.addNdefListener(nfcCListener, function() {}, function() {});
	} else {
		setInterval(updateAcc, 1000); 
	}
}

var nfcTimes = 4; 
// The NFC Listener
function eventListener(nfcEvent) {
	var tag = nfcEvent.tag, ndefMessage = tag.ndefMessage || []; 
	var ctx = document.getElementById("nfcContents"); 
	// Determine if quest is complete
	if (Ndef.bytesToString(ndefMessage[0].payload) == questTagRequired) {
		nfcTimes --; 
		if (nfcTimes==0) location = "home.html"; 
		if (questNumber=="0" || questNumer=="1") 
			playAnimalSound(SOUND_BRUSH);
		else 
			playAnimalSound(SOUND_FEED); 
	} else {
		playAnimalSound(SOUND_ANNOYED); 
	}
}

// The Accelerometer Listener
var rockCounter = 20 + Math.floor(Math.random() * 16); 	// Amount of rocks

var prevAX = 0, prevAY = 0, prevAZ = 0; 		// Cannot initialize as zero since 0 acceleration is no motion. 

function updateAcc() {
	navigator.accelerometer.getCurrentAcceleration(onSuccess, function(){alert("error"); });
}

function onSuccess(a) {
	// Determine rocking motion
	var currentAX = Math.sign(a.x); 
	var currentAY = Math.sign(a.y); 
	var currentAZ = Math.sign(a.z); 
	var qDescription = document.getElementById("QuestDesc");
	 qDescription.innerHTML = a.x + ", " + a.y + ", " + a.z + ", " + rockCounter; 
	// Check for accelerometer change
	if (currentAX != prevAX || currentAY != prevAY || currentAZ != prevAZ) {
		rockCounter--;
		playAnimalSound(SOUND_ROCK); 
	}
	// Check if rocks have been done; if successful, return to home. 
	if (rockCounter == 0) {
		location = "home.html"; 
	}
	// Update previous acceleration
	prevAX = currentAX; 
	prevAY = currentAY; 
	prevAZ = currentAZ; 
}