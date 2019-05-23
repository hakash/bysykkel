const request = require("request-promise-native");
const Station = require("./Station");

class StationDataFetcher {
	constructor(options){
		this.options = options;
	}

	async getStations(){
		const opts = {
			uri: this.options.uris.information,
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
			console.log(err);
			return {};
		}
	}

	async getStatus(stations){
		const opts = {
			uri: this.options.uris.status,
			json: this.options.json,
			headers: this.options.headers
		}

		try {
			const response = await request(opts);
			const statusRaw = response.data.stations;
	
			stations.count.bikes = 0;
			stations.count.docks = 0;
			statusRaw.forEach(stationStatus => {
				const id = stationStatus.station_id;

				if(id && stations[id]){
					stations[id].loadStatus(stationStatus);
					//console.log(stations[id]);
				}
			});

			return true;
		} 
		catch (err) {
			console.log(err);
			return false;
		}
	}
}

module.exports = StationDataFetcher;