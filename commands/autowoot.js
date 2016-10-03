/*
 * Basic command info, for the core to process
 */

var permLevel = 1;
var name = "AutoWoot";
var nameLower = "autoWoot";
var desc = "Toggles auto-woot on or off immediately.";
var cmd = "autowoot";
var aliases = ["aw", "autow"];


/*
 * Contains all functions to export when used in core.
 */

module.exports = {
	init: function(bot){
		this.autoWoot = true;
		this.info = {permLevel: permLevel, name: name, nameLower: nameLower, desc: desc, cmd: cmd, aliases: aliases};
		this.bot = bot;
	},
	execute: function(data){
		if(data.hasPerm){
			this.autoWoot = !this.autoWoot;
			console.log(data.bot);
			data.bot.sendChat('AutoWoot now ' + ((this.autoWoot) ? "ENABLED" : "DISABLED"));
			if(this.autoWoot == true){
				data.bot.woot();
			}
		}else{
			data.bot.sendChat('AutoWoot is currently ' + ((this.autoWoot) ? "ENABLED" : "DISABLED"));
		}
	},
	onAdvance: function(data){
		if(this.autoWoot){
			data.bot.woot();
		}
	}
}