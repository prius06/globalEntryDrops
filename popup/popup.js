//ELEMENTS
const locationIdElement = document.getElementById("locationId")
const startDateElement = document.getElementById("startDate")
const endDateElement = document.getElementById("endDate")

//Button elements
const startButton = document.getElementById("startButton")
const stopButton = document.getElementById("stopButton")

//Span elements
const runningSpan = document.getElementById("runningSpan")
const stopedSpan = document.getElementById("stopedSpan")

//Error message
const locationIdError = document.getElementById("locationIdError")
const startDateError = document.getElementById("startDateError")
const endDateError = document.getElementById("endDateError")

const hideElement = (elem) => {
	elem.style.display = "none";
}

const showElement = (elem) => {
	elem.style.display = "";
}

const disableElement = (elem) => {
	elem.disabled = true;
}

const enableElement = (elem) => {
	elem.disabled = false;
}

const handleOnStartState = () => {
	// spnas
	showElement(runningSpan)
	hideElement(stopedSpan)
	// Buttons
	disableElement(startButton);
	enableElement(stopButton);
	//Inputs
	disableElement(locationIdElement)
	disableElement(startDateElement)
	disableElement(endDateElement)
}

const handleOnStopState = () => {
	// spnas
	showElement(stopedSpan)
	hideElement(runningSpan)
	// Buttons
	disableElement(stopButton);
	enableElement(startButton);
	//Inputs
	enableElement(locationIdElement);
	enableElement(startDateElement);
	enableElement(endDateElement);
}

const showDateError = (dateErrorElem, errorMassage) => {
	dateErrorElem.innerHTML = errorMassage;
	shouElement(dateErrorElem);
}

const validateStartDate = (today, startDate) => {
	const isAfterToday = !startDate.isBefore(today, 'date');

	if (!startDateElement.value) {
		showDateError(startDateError, 'Please enter a valid start date.');
	} else if (!isAfterToday) {
		showDateError(startDateError, 'Start date must not be before today.');
	} else {
		hideElement(startDateError);
	}

	return startDateElement.value && isAfterToday
}

const vakudateEndDate = (today, startDate, endDate) => {
	const isAfterStartDate = endDate.isAfter(startDate, 'date');
	const isAfterToday = endDate.isAfter(today, 'date');
	
	if (!endDateElement.value) {
		showDateError(endDateError, 'Please enter a valid end date');
	} else if (!isAfterStartDate) {
		showDateError(endDateError, 'End date must be after the start date');
	} else if (!isAfterToday) {
		showDateError(endDateError, 'End date must be agter today');
	} else {
		hideElement(endDateError);
	}

	return endDateElement.value && isAfterStartDate && isAfterToday
}
const validataDates = () => {
	// today <> start date < end date
	const today = spacetime.now().startOf('day')
	const startDate = spacetime(startDateElement.value).startOf('day');
	const endDate = spacetime(endDateElement.value).startOf('day');

	const isStartDateValid = validateStartDate(today, startDate);
	const isEndDateValid = validateEndDate(today, startDate, endDate);

	return isStartDateValid && isEndDateValid
}

const performOnStartValidations = () => {
	const isDateValid = validataDates();

	if (!locationIdElement.value) {
		showElement(locationIdError);
	} else {
		hideElement(locationIdError);
	}

	return locationIdElement.value && isDateValid;
}

startButton.onclick = () => {
	const allFieldsValid = performOnStartValidations();

	if (allFieldsValid) {
		handleOnStartState();
		const prefs = {
			locationId: locationIdElement.value,
			startDate: startDateElement.value,
			endDate: endDateElement.value
		}
		chrome.runtime.sendMessage({ event: 'onStart', prefs })
	}
}

stopButton.onclick = () => {
	handleOnStopState();
	chrome.runtime.sendMessage({ event: 'onStop' })
}

chrome.storage.local.get(["locationId", "startDate", "endDate", "locations", "isRunning"], (result) => {
	const { locationId, startDate, endDate, locations, isRunning } = result;

	setLocations(locations);

	if (locationId) {
		locationIdElement.value = locationId
	}
	if (startDate) {
		startDateElement.value = startDate
	}
	if (endDate) {
		endDateElement.value = endDate
	}
	if (isRunning) {
		handleOnStartState();
	} else {
		handleOnStopState();
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

const today = spacetime.now().startOf('day').format();
startDateElement.setAttribute('min', today);
endDateElement.setAttribute('min', today);