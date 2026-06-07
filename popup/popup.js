//ELEMENTS
const locationIdElement = document.getElementById("locationId")
const startDateElement = document.getElementById("startDate")
const endDateElement = document.getElementById("endDate")

//Button elements
const startButton = document.getElementById("startButton")
const stopButton = document.getElementById("stopButton")

startButton.onclick = function(){
	console.log("You clicked the start button");
}

stopButton.onclick = function(){
	console.log("You clicked the stop button");
}