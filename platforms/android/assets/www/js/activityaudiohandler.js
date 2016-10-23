// This js file to be placed in quest.html

function playAudio(url) {
	
	var my_media = new Audio();
	my_media.src = url; 
	my_media.play(); 
	
	
}

var SOUND_FEED = 1;
var SOUND_BRUSH = 2;
var SOUND_ROCK = 3; 
var SOUND_ANNOYED = 4; 

// Val: 1: feed
//	    2: brush
//      3: rock
//      4: annoyed
function playAnimalSound(val) {
	switch (val) {
		case 1: 
			playAudio("audio/feed.mp3");
			break;
		case 2:
			playAudio("audio/brush.mp3"); 
			break; 
		case 3: 
			playAudio("audio/rock.mp3"); 
			break;
		case 4: 
			playAudio("audio/annoyed.mp3"); 
			break;
	}
}