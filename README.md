# unforgetimals

##About
HackTX 2016 entry for clillie100, jaswitzer16, jer-zhang, kaellel. 

##Inspiration
One of the problems faced by the elderly, especially the widowed with dementia, is the heartbreaking crush of losing loved ones they have cared for their whole life. Our application seeks to introduce “emotional support” and care into life while delivering activity statistics and reducing the pace of dementia.

##What it does
Our application is designed to run on an Android phone attached to a life-sized pet analog, such as a plush toy; it interacts with its user periodically through quests. Studies have shown that logical reasoning slows down dementia and the onset of Alzheimer’s. Our device seeks to mitigate the effects of memory loss by introducing logical games based on caring for the animal. Occasionally, the phone attached to the plush animal will make noises such as a cat’s yearning for attention; the animal will seek a specific item, such as a fur brush, and until that item is found, the animal will continue to express displeasure and seek attention. This logical game attempts to make the patient locate the correct item, and then apply that item to the device in a caring way. This is achieved by NFC and NFC tags; the device’s smartphone is programmed to seek an item that carries a specific NFC identifier.

##How we built it
Unforgetimals is build using Cordova and HTML, JavaScript, and CSS. The user interface is based on Materialize CSS, an open source CSS framework.

##Challenges we ran into
The unique architecture of Cordova presented challenges, specifically, issues revolving around the OnDeviceReady event and accelerometer measurements.

##Accomplishments that we're proud of
The application has a fluid user interface that is straightforward to use, and is relatively bug-free.

##What's next for Unforgetimals
Unforgetimals can be extended by adding more quest activities; it can also undergo more extensive NFC tag testing.

##Built With
apache
javascript
html
css3
