const StationDataFetcher = require("./StationDataFetcher");

const stationListURL = "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json";
const stationStatusURL = "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json";

const headers = {
	"Client-Identifier": "testcompany-testapp",
};

const options = {
	uris: {
		information: stationListURL,
		status: stationStatusURL
	},
	headers,
	json: true,
};

const stationDataFetcher = new StationDataFetcher(options);

function printData(stations){
	const headers = getListHeaders();
	let count = 0;
	for( let stationIdx in stations ) {
		if(count % 20 == 0){
			console.log(headers);
		}
		count++;
		console.log(formatListData(stations[stationIdx].getListInfo()));
	}
}

function getListHeaders(){
	let headers = "\n";
	
	headers += `${" ".padEnd(40)}` + 
			   `   Ledige ` + 
			   `   Ledige `;

	headers += "\n";
	
	headers += `${"Navn".padEnd(40)}` + 
			   `   Sykler ` + 
			   `   Plasser`;

	headers += "\n";

	headers += "-".repeat(60);

	//headers += "\n";

	return headers;
}

function formatListData(data){
	return `${data.name.padEnd(40)}` + 
		   ` | ${(data.numBikesAvailable + "").padStart(3)}/${(data.capacity + "").padStart(3)}` + 
		   ` | ${(data.numDocksAvailable + "").padStart(3)}/${(data.capacity + "").padStart(3)}`;
}

async function run(){
	const stations = await stationDataFetcher.getStations();
	if( ! await stationDataFetcher.getStatus(stations) ){
		console.log("Error getting status for stations.");
		return;
	}
	printData(stations);
}


run();
