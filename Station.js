const defaults = {
	information: {
		station_id: "0",
		name: "N/A",
		address: "N/A",
		lat: 0.0,
		lon: 0.0,
		capacity: -1,
	},
	status: {
		is_installed: 0,
		is_renting: 0,
		num_bikes_available: -1,
		num_docks_available: -1,
		last_reported: 0,
		is_returning: 0,
		station_id: "0",
	},
};

class Station {
	constructor(stationData) {
		this.loadInformation(stationData.information || defaults.information);
		this.loadStatus(stationData.status || defaults.status, true);
	}

	loadInformation(stationInfo) {
		this.stationId = stationInfo.station_id || "0";
		this.name = stationInfo.name || "";
		this.address = stationInfo.address || "";
		this.lat = stationInfo.lat || 0.0;
		this.lon = stationInfo.lon || 0.0;
		this.capacity = stationInfo.capacity || 0;
	}

	loadStatus(stationStatus, force = false) {
		if (!force && stationStatus.station_id !== this.stationId) {
			throw new Error(`You are trying to save station status for station ${stationStatus.station_id} in the station with id ${this.stationId}.`);
		}

		this.isInstalled = stationStatus.is_installed || 0;
		this.isRenting = stationStatus.is_renting || 0;
		this.isReturning = stationStatus.is_returning || 0;
		this.numBikesAvailable = stationStatus.num_bikes_available || 0;
		this.numDocksAvailable = stationStatus.num_docks_available || 0;
		this.lastReported = stationStatus.last_reported || 0;
	}

	getListInfo(){
		return {
			stationId: this.stationId,
			name: this.name,
			address: this.address,
			lat: this.lat,
			lon: this.lon,
			numBikesAvailable: this.numBikesAvailable,
			numDocksAvailable: this.numDocksAvailable,
			capacity: this.capacity
		}
	}
}

module.exports = Station;
