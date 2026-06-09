//ELEMENTS
const locationIdElement = document.getElementById("locationId")
const startDateElement = document.getElementById("startDate")
const endDateElement = document.getElementById("endDate")

//Button elements
const startButton = document.getElementById("startButton")
const stopButton = document.getElementById("stopButton")

startButton.onclick = () =>{
	const prefs = {
		locationId: locationIdElement.value,
		startDate: startDateElement.value,
		endDate: endDateElement.value
	}
	chrome.runtime.sendMessage({event: 'onStart', prefs})
}

stopButton.onclick = () => {
	chrome.runtime.sendMessage({event: 'onStop'})
}

chrome.storage.local.get(["locationId","startDate","endDate","locations"],(result) => {
	const {locationId, startDate, endDate, locations} = result;

	setLocations(locations);

	if(locationId){
		locationIdElement.value = locationId
	}
	if(startDate){
		startDateElement.value = startDate
	}
	if(endDate){
		endDateElement.value = endDate
	}
});

// const setLocations: (locations: any) => void
const setLocations = (locations) => {
	locations.forEach(location => {
		let optionElement = document.createElement("option");
		optionElement.value = location.id;
		optionElement.innerHTML = location.name;
		locationIdElement.appendChild(optionElement);
	});
}