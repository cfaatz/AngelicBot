/*
 * Basic command info, for the core to process
 */

var permLevel = 0;
var name = "Random Dog";
var desc = "Prints a random dog picture.";
var cmd = "dog";
var aliases = ["randdog", "rdog", "dogs"];


/*
 * Contains all functions to export when used in core.
 */

module.exports = {
	init: function(){
		this.lastJoke = 0;
		this.info = {permLevel: permLevel, name: name, desc: desc, cmd: cmd, aliases: aliases};
	},
	execute: function(data){
		var now = new Date().getTime();
		if(now - this.lastJoke >= 2500){
			var request = require("request");
			var url = "http://random.dog/";
			request({
				url: url,
				json: false
			}, function(error, response, body) {
				if(!error && response.statusCode == 200){
					body = body.replace("\n", "").replace(/.+<img src=\'(.+)\'>.+/gm, "http://random.dog/$1");
					data.bot.sendChat(body);
				}else{
					console.log("Request for new cat failed.");
					data.bot.sendChat("Could not get you a cat :( Sorry.");
				}
			});
			this.lastJoke = now;
		}
	}
}