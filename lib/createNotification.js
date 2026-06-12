export const createNotification = (openSlot, numberOfSlots, prefs) => {
		const {tzData} = prefs;

		let massage = ""
		if(numberOfSlots > 1) {
			massage = `Found an open interview at ${openSlot.timestamp}(${tzData} timeZone) and $(numberOfSlots - 1) additional open interview`
		} else{
			`Found an open interview at ${openSlot.timestamp}(${tzData} timeZone)`
		}

		chrome.notifications.create({
			title: "Global Entry Profs",
			massage,
			inconUrl:"../images/icon48.png",
			type: "basic"
		})
	}

	chrome.notifications.onClicked.addListener(() => {
		chrome.tabs.create({url: "https://ttp.cbp.dhs.gov/schedulerapi/locations/?temporary=false&inviteOnly=false&operational=true&serviceName=Global%20Entry"})
	})