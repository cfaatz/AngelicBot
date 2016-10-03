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
	init: function(singleton){
		this.autoWoot = false;
		this.info = {permLevel: permLevel, name: name, desc: desc}
	},
	execute: function(args){
		this.autoWoot = !this.autoWoot;
	},
	onAdvance: function(data){
		if(this.autoWoot)woot();
	}
}