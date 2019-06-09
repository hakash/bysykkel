const request = require("request-promise-native");
const StationDataFetcher = require("./StationDataFetcher");
const StationDataPrinter = require("./StationDataPrinter");

class BikeshareFeed {
	constructor(url, companyName, appName, lang){
		this.eventListeners = {
			ready:[],
		}
		this.options = {
			uris: {
				station_information:"",
				station_status:"",
				system_information:"",
				autodiscover: url
			},
			preferredLang:lang || "en",
			json:true,
			headers: {
				"Client-Identity": `${companyName}-${appName}`
			}
		};

		this.stations = {};
		this.stationDataPrinter = new StationDataPrinter();
		this.stationDataFetcher = null;

	}

	on(event, handler){
		if(!this.eventListeners[event]){
			this.eventListeners[event] = [];
		}
		
		this.eventListeners[event].push(handler);
	}

	print(formatted = true){
		this.stationDataPrinter.printData(this.stations, formatted);
	}

	csv(withHeaders = true){
		return this.stationDataPrinter.getCSV(this.stations, withHeaders);
	}

	getLanguageFeed(data){
		const lang = this.options.preferredLang;
		if(data[lang]){
			return data[lang].feeds;
		}

		if(data["en"]){
			return data["en"].feeds;
		}

		return data[Object.keys(data)[0]].feeds;
	}

	async loadFeed(){
		const opts = {
			uri: this.options.uris.autodiscover,
			json: this.options.json,
			headers: this.options.headers
		}

		try {
			const response = await request(opts);
			const data = response.data;
			const feeds = this.getLanguageFeed(data);

			feeds.forEach(feed => {
				if(feed.name && feed.url){
					this.options.uris[feed.name] = feed.url;
				}
			});

			if(this.options.uris.station_information && this.options.uris.station_status){
				
				this.stationDataFetcher = new StationDataFetcher(this.options);
				
				this.stations = await this.stationDataFetcher.getStations();
				
				const statusDidUpdate =  await this.stationDataFetcher.getStatus(this.stations);

				if( !statusDidUpdate ){
					let error = new Error("Error getting status for stations.");

					this.eventListeners.ready.forEach(handler => handler(error));
					return;
				}
				this.eventListeners.ready.forEach(handler => handler());
				
			}
	
		} 
		catch (err) {
			console.log("There was an error loading the feeds from the autodiscover. Please ensure the file exists and contains the correct information.");
			console.log(err);
			return;
		}

	}
}

module.exports = BikeshareFeed;