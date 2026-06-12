const LOCATION_ENDPOINT = "https://ttp.cbp.dhs.gov/schedulerapi/locations/?temporary=false&inviteOnly=false&operational=true&serviceName=Global%20Entry"

export const fetchLocations = () => {
	fetch(LOCATION_ENDPOINT)
		.then(response => response.json())
		.then((data) => {
			const filteredLocaions = data.map(loc => ({
				"id": loc.id,
				"name": loc.name,
				"shortName": loc.shortName,
				"tzData": loc.tzData
			}));
			filteredLocaions.sort((a, b) => a.name.localeCompare(b.name));
			chrome.storage.local.set({locations: filteredLocaions})
			console.log(filteredLocaions);
		})
		.catch((error) => {
			console.log(error);
		});
}