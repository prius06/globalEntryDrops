export const createNotification = (openSlot, numberOfSlots, prefs) => {
		const {tzData} = prefs;

		let massage = `Found an open interview at ${openSlot.timestamp}(${tzData} timeZone)`
		if(numberOfSlots > 1) {
			massage = `${massage} and $(numberOfSlots - 1) additional open interview`
		} 

		chrome.notifications.create({
			title: "Global Entry Profs",
			massage,
			inconUrl:"../images/icon48.png",
			type: "basic"
		})
	}
