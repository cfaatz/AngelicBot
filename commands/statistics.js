/*
 * Basic command info, for the core to process
 */

var permLevel = 0;
var name = "Statistics";
var desc = "Prints user information";
var cmd = "stats";
var aliases = ["statistics", "s", "stat"];


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
			var rand = Math.floor((Math.random() * jokes.length));
			data.bot.sendChat(jokes[rand]);
			this.lastJoke = now;
		}
	}
}