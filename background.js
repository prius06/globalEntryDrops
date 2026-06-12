import {fetchLocations} from "./api/fetchLocations.js";
import {fetchOpenSlots} from "./api/fetchOpenSlots.js";
import {createNotification} from "./lib/createNotification.js";

const ALARM_JOB_NAME = "DROP_ALARM"

let cachedPrefs = {};
let firstApptTimestamp = null;

chrome.runtime.onInstalled.addListener((details) => {
	handleOnStop();
	fetchLocations();
	// console.log("onInstalled reason",details.reason)
});

chrome.runtime.onMessage.addListener((data) => {
	const { event, prefs } = data;

	switch (event) {
		case "onStop":
			handleOnStop();
			break;
		case "onStart":
			handleOnStart(prefs);
			break;
		default:
			break;
	}
});

const handleOnStop = () => {
	console.log("On stop in background");
	setRnningStatus(false);
	stopAlarm();
	cachedPrefs = {};
	firstApptTimestamp = null;
};

const handleOnStart = (prefs) => {
	console.log("prefs received:", prefs);
	cachedPrefs = prefs
	chrome.storage.local.set(prefs);
	setRnningStatus(true);
	createAlarm();
};

const setRnningStatus = (isRunning) => {
	chrome.storage.local.set({ isRunning })
}

const createAlarm = () => {
	chrome.alarms.get(ALARM_JOB_NAME, (existingAlarm) => {
		if(!existingAlarm) {
			// immediately run the job
			openSlotsJob();
			chrome.alarms.create(ALARM_JOB_NAME, { periodInMinutes: 1.0 })
		}
	})
}

const stopAlarm = () => {
	chrome.alarms.clearAll()
}

chrome.alarms.onAlarm.addListener(() => {
	console.log("onAlarm scheduled code running...")
	openSlotsJob();
})

const openSlotsJob = () => {
	fetchOpenSlots(cachedPrefs)
	.then(data => handleOpenSlots(data))
}

const handleOpenSlots = (openSlots) => {
	if(openSlots && openSlots.length > 0 && openSlots[0].firstApptTimestamp != firstApptTimestamp){
		firstApptTimestamp = openSlots[0].timestamp;
		createNotification(openSlots[0], opemSlots.length,cachedPrefs);
	}
}