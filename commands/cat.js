/*
 * Basic command info, for the core to process
 */

var permLevel = 0;
var name = "Random Cat";
var desc = "Prints a random cat picture.";
var cmd = "cat";
var aliases = ["randcat", "rcat", "cats"];


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
			var url = "http://random.cat/meow.php";
			request({
				url: url,
				json: true
			}, function(error, response, body) {
				if(!error && response.statusCode == 200){
					data.bot.sendChat(body.file);
				}else{
					console.log("Request for new cat failed.");
					data.bot.sendChat("Could not get you a cat :( Sorry.");
				}
			});
			this.lastJoke = now;
		}
	}
}