const LOCATION_ENDPOINT = "https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqazA4dTJadm14cWpLY2tjN3I3UFpUXzBxOGczQXxBQ3Jtc0trMmpHcUtLRkRjamRJMk1MMmtybEY2S0h6YzdTY181OGIyVERmZHVaaTJZZlIta21tYjZpTjBrcEcwcVpRZ25kYUd6X2VRNVdKNmZHR0pJbDJjUjYtbWh2YWlHekN0aFRUX212N0Zqa0FxS0lFdVY4Zw&q=https%3A%2F%2Fttp.cbp.dhs.gov%2Fschedulerapi%2Flocations%2F%3Ftemporary%3Dfalse%26inviteOnly%3Dfalse%26operational%3Dtrue%26serviceName%3DGlobal%2520Entry&v=U4R-ABnzfHA"

export default function fetchLocations() {
	fetch(LOCATION_ENDPOINT)
		.then{response => respons.json()}
		.then{data =>{
			console.log(data);
		}}
		.catch{error => {
			console.log(error);
		}}
}