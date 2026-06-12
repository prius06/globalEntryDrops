import { handleNotification } from "../lib/hadleNotification.js";
// Fetch the list of open interviews at a location in given date period
export const fetchOpenSlots = (result) => {
	console.log(result);
	// "https://ttp.cbp.dhs.gov/schedulerapi/locations/?temporary=false&inviteOnly=false&operational=true&serviceName=Global%20Entry"
	const { locationId, startDate, endDate } = result;
	const appointmentUrl = `https://ttp.cbp.dhs.gov/schedulerapi/locations/${locationId}/slots?startTimestamp=${startDate}T00:00:00&endTimestamp=${endDate}T00:00:00`;
	fetch(appointmentUrl)
		.then((response) => response.json())
		.then((data) => data.filter((slot) => slot.active > 0))
		.then((data) => handleNotification(data))
		.catch((error) => {
			console.log(error);
			reject();
		})
}