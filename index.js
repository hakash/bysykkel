const BikeshareFeed = require("./BikeshareFeed");

const autodiscoverUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/gbfs.json";

const bf = new BikeshareFeed(autodiscoverUrl,"testcompany","testapp");

bf.on("ready",(err) => {
	if(err){
		console.log(err);
		return;
	}
	bf.print();
});