export const handleNotification = (activeAppointments) => {
	if(activeAppointments.length > 0){
		createNotification(activeAppointments[0])
	}
}

	const createNotification = (activeAppointment) => {
		chrome.notifications.create({
			title: "Global Entry Profs",
			massage: `Found an open interview at ${activeAppointment.timestamp}`,
			inconUrl:"./images/icon48.png",
			type: "basic"
		})
	}