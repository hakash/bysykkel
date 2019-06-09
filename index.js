const BikeshareFeed = require("./BikeshareFeed");

const autodiscoverUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/gbfs.json";

const bf = new BikeshareFeed(autodiscoverUrl,"test company","test app");

bf.on("ready",(err) => {
	if(err){
		console.log(err);
		return;
	}
	bf.print();
});

bf.loadFeed();