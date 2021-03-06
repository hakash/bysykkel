const request = require("request-promise-native");
const Station = require("./Station");

class StationDataFetcher {
	constructor(options){
		this.options = options;
	}

	async getStations(){
		const opts = {
			uri: this.options.uris.station_information,
			json: this.options.json,
			headers: this.options.headers
		}

		try {
			const response = await request(opts);
			const stationsRaw = response.data.stations;
			const stations = {};
	
			stationsRaw.forEach(stationInfo => {
				if(stationInfo.station_id){
					stations[stationInfo.station_id] = new Station({information: stationInfo});
				}
			});
	
			return stations;
		} 
		catch (err) {
			return {};
		}
	}

	async getStatus(stations){
		const opts = {
			uri: this.options.uris.station_status,
			json: this.options.json,
			headers: this.options.headers
		}

		try {
			const response = await request(opts);
			const statusRaw = response.data.stations;
	
			statusRaw.forEach(stationStatus => {
				const id = stationStatus.station_id;

				if(id && stations[id]){
					stations[id].loadStatus(stationStatus);
				}
			});

			return true;
		} 
		catch (err) {
			return false;
		}
	}
}

module.exports = StationDataFetcher;