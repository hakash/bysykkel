class StationDataPrinter {
	printData(stations, formatted = true){
		const headers = this.getListHeaders();
		let count = 0;
		for( let stationIdx in stations ) {
			if(formatted && count % 20 == 0){
				console.log(headers);
			}
			count++;
			if(formatted){
				console.log( this.formatListData(stations[stationIdx].getListInfo()) );
			}
			else {
				console.log( stations[stationIdx].getListInfo() );
			}
		}
	}
	
	getCSV(stations, withHeaders = true){
		const headers = `station_id,name,address,lat,lon,numBikesAvail,numDocksAvail,capacity\n`;
		let buffer = "";

		if(withHeaders){
			buffer += headers;
		}

		for( let stationIdx in stations ) {
			const info = stations[stationIdx].getListInfo();
		
			buffer += `${JSON.stringify(info.stationId || '')}`
				+`,${JSON.stringify(info.name || '')}`
				+`,${JSON.stringify(info.address || '')}`
				+`,${info.lat || 0.0}`
				+`,${info.lon || 0.0}`
				+`,${info.numBikesAvailable || 0}`
				+`,${info.numDocksAvailable || 0}`
				+`,${info.capacity || 0}`
				+`\n`;
		}
		return buffer;
	}

	getListHeaders(){
		let headers = "\n";
		
		headers += `${" ".padEnd(40)}` + 
				   `   Free   ` + 
				   `   Free   `;
	
		headers += "\n";
		
		headers += `${"Name".padEnd(40)}` + 
				   `   Bikes  ` + 
				   `   Docks  `;
	
		headers += "\n";
	
		headers += "-".repeat(60);
		
		return headers;
	}
	
	formatListData(data) {
		if(data.name == undefined || data.numBikesAvailable == undefined || data.numDocksAvailable == undefined || data.capacity == undefined){
			console.warn("StationDataPrinter( formatListData ): Supplied data is missing required properties.");
			return "";
		}

		return `${data.name.padEnd(40)}` + 
			   ` | ${(data.numBikesAvailable + "").padStart(3)}/${(data.capacity + "").padStart(3)}` + 
			   ` | ${(data.numDocksAvailable + "").padStart(3)}/${(data.capacity + "").padStart(3)}`;
	}
}

module.exports = StationDataPrinter;