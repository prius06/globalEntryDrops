import  fetchLocations  from "./api/fetchLocations.js";

const ALARM_JOB_NAME = "DROP_ALARM"

chrome.runtime.onInstalled.addListener((details) => {
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
};

const handleOnStart = (prefs) => {
	console.log("prefs received:", prefs);
	chrome.storage.local.set(prefs);
	createAlarm();
};

const createAlarm  = () => {
	chrome.alarms.create(ALARM_JOB_NAME,{periodInMinutes: 1.0})
}

chrome.alarms.onAlarm.addListener(() => {
	console.log("onAlarm scheduled code running...")
})
