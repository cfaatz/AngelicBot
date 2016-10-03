/************************************
**Developed by Tudedude/Tudedude100**
** For AngelicCraft's plug.dj room **
**http://www.plug.dj/angelic-craft **
*************************************
**   AngelicCraft MC Server IP:    **
**     mc.angeliccraftpvp.net      **
*************************************
**  AngelicCraft Website Address   **
** http://www.angeliccraftpvp.net  **
*************************************
**     No Permission For Reuse     **
*************************************
**   Using PlugAPI - API Credits   **
*************************************
**  This code is slightly edited   **
**  To Remove Passwords and Such   **
*************************************/

//The array containing all loaded command objects
var commands = [];
var PlugAPI = require('plugapi');
const fs = require('fs');
const credentials = require('./credentials');
var bot = new PlugAPI({
    email: credentials.username,
    password: credentials.password
});

/*
 * Utility commands, such as for string operations
 */
 
if (typeof String.prototype.startsWith != 'function'){
	String.prototype.startsWith = function (str){
		return this.indexOf(str) === 0;
	};
}

if (typeof String.prototype.endsWith != 'function'){String.prototype.endsWith = function (str){return this.indexOf(str) === this.length - str.length;};}

if(typeof String.prototype.replaceAt != 'function'){
	String.prototype.replaceAt=function(index, character){
		return this.substr(0, index) + character + this.substr(index);
	}
}

if(typeof String.prototype.contains != 'function'){
	String.prototype.contains = function(it){ 
		return this.indexOf(it) != -1; 
	};
}

function collect() {
  var ret = {};
  var len = arguments.length;
  for (var i=0; i<len; i++) {
    for (p in arguments[i]) {
      if (arguments[i].hasOwnProperty(p)) {
        ret[p] = arguments[i][p];
      }
    }
  }
  return ret;
}

var loadCommands = function(){
	var files = fs.readdirSync("./commands");
	for(var i = 0; i < files.length; i++){
		var cmd = require('./commands/' + files[i].substring(0, files[i].length-3));
		commands[commands.length] = cmd;
		cmd.init();
		console.log("Command " + cmd.info.name + " has been loaded and enabled.");
	}
}

var checkPerms = function(id, thresh){
	
	return true;
	
	if(/*get perms for id*/5 < thresh)return false;
	else return true;
}

loadCommands();
console.log('Length: ' + commands.length);

bot.connect('angeliccraftmc'); // The part after https://plug.dj

var version = "0.01";
var autowootbool = true;
var kill = false;
var lastJoke = 0;
var votes = 0;
var skipBar = 0;
var votids = {};
var voteskipnots = 0;
var users = {};

bot.on('roomJoin', function(room) {
	console.log('Loading commands...');
    console.log("Joined " + room);
	//bot.sendChat("AngelicBot v" + version + ", Developed by Tudedude/Tudedude100: Enabled", 1000);
});

bot.on('advance', function(data){
	var botDict = {bot: bot};
	data = collect(data, botDict);
	for(var i = 0; i < commands.length; i++){
		if(commands[i].onAdvance != undefined){
			commands[i].onAdvance(data);
		}
	}
});

bot.on('chat', function(data){
	var msg = data.message;
	var sender = data.raw.username;
	var date = new Date().getTime();
	
	/*
	 * If the message starts with a '!' it is a command. Dispatch it correctly.
	 */
	if(msg.startsWith("!")){
		var commandSplit = msg.split(' ');
		var command = "";
		var args = [];
		for(var i = 0; i < commandSplit.length; i++){
			if(i == 0)command = commandSplit[i].toLowerCase().substring(1);
			else args[args.length] = commandSplit[i];
		}
		console.log("User '" + data.from.username + "' (ID: '" + data.from.id + "') ran command: '" + msg.substring(1) + "'");
		for(var i = 0; i < commands.length; i++){
			if(commands[i].info.cmd == command || commands[i].info.aliases.indexOf(command) != -1){
				if(checkPerms(data.from.id, commands[i].info.permLevel))
					commands[i].execute({player: data.from, cmd: command, args: args, fullData: data, hasPerm: true, bot: bot});
				else{
					console.log("User '" + data.from.username + "' (ID: '" + data.from.id + "') was denied access to command: '" + command + "'");
					commands[i].execute({player: data.from, cmd: command, args: args, fullData: data, hasPerm: false});
				}
			}
		}
		/*
		if(msg === '!kill'){
			if(sender === 'Tudedude100'){
				bot.sendChat("Dying... :(");
				kill = true;
				bot.close();
			}
			bot.sendChat("" + sender);
		}else if(msg.toLowerCase() === '!autowoot'){
			if(autowootbool === true){
				autowootbool = false;
				bot.sendChat('AutoWoot: DISABLED');
				console.log("Settings updated");
				statusUpdate();
			}else{
				autowootbool = true;
				bot.sendChat('AutoWoot: ENABLED');
				console.log("Settings updated");
				statusUpdate();
			}
		}else if(msg.toLowerCase() === '!voteskip'){
			
		}else if(msg.toLowerCase() === "!joke"){
			var date = new Date();
			if(date-lastJoke >= 60000){
				var rand = Math.floor((Math.random() * jokes.length));
				bot.sendChat(jokes[rand]);
				lastJoke = date;
			}
		}else if(msg.toLowerCase() === "!version"){
			bot.sendChat("AngelicBot developed by Tudedude/Tudedude100, running version: " + version);
		}*/
	}
});

var reconnect = function(){ if(kill != true)bot.connect('angelic-craft'); };

bot.on('close', reconnect);
bot.on('error', reconnect);