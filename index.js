const StationDataFetcher = require("./StationDataFetcher");
const StationDataPrinter = require("./StationDataPrinter");

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
const stationDataPrinter = new StationDataPrinter();

async function run(){
	const stations = await stationDataFetcher.getStations();
	if( ! await stationDataFetcher.getStatus(stations) ){
		console.log("Error getting status for stations.");
		return;
	}
	stationDataPrinter.printData(stations);
}


run();
