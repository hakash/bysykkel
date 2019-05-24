class StationDataPrinter {
	printData(stations){
		const headers = this.getListHeaders();
		let count = 0;
		for( let stationIdx in stations ) {
			if(count % 20 == 0){
				console.log(headers);
			}
			count++;
			console.log( this.formatListData(stations[stationIdx].getListInfo()) );
		}
	}
	
	getListHeaders(){
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