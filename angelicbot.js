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
const credentials = require('credentials.js');
var bot = new PlugAPI({
    email: credentials.username,
    password: credentials.password
});

var loadCommands = function(){
	var files = fs.readdirSync("./commands");
	for(var i = 0; i < files.length; i++){
		if(files[i].endsWith('.js')){
			var cmd = require('./commands/' + files[i].substring(0, a.length-3));
			commands[commands.length] = cmd;
			cmd.init(bot);
		}
	}
}

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

bot.on('roomJoin', function(room){
	console.log('Loading commands...');
	loadCommands();
    console.log("Joined " + room);
	//bot.sendChat("AngelicBot v" + version + ", Developed by Tudedude/Tudedude100: Enabled", 1000);
});

bot.on('advance', function(data){
	for(int i = 0; i < commands.length; i++){
		if(commands[i].onAdvance != undefined){
			commands[i].onAdvance(data);
		}
	}
});

bot.on('chat', function(data){
	var msg = data.message;
	var sender = data.raw.un;
	var date = new Date().getTime();
	if(msg.startsWith("!")){
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
			
		}else if(msg.toLowerCase() === '!witb'){
			var date = new Date();
			if(d-lastJoke >= 1000){
				bot.sendChat('My creator, Tudedude is the best!!!!!! <3 you Tudedude.');
				lastJoke = d;
			}
		}else if(msg.toLowerCase() === "!joke"){
			var date = new Date();
			if(date-lastJoke >= 60000){
				var rand = Math.floor((Math.random() * jokes.length));
				bot.sendChat(jokes[rand]);
				lastJoke = date;
			}
		}else if(msg.toLowerCase() === "!version"){
			bot.sendChat("AngelicBot developed by Tudedude/Tudedude100, running version: " + version);
		}
	}
});

var jokes = ["What do you call a cow with no legs? Ground beef!", "What's a duck's favorite dip? Quackamole!", 
"Past, present, and future walked into a bar... it was tense.", "How do you tell the difference between an alligator and a crocodile? You'll see one later and the other in a while!",
"Three men walked into a bar... They were rather embarrassed.", "Have you heard about that new duck vet? I heard he's a real quack.",
"Where should you look to find a lost dog? On the woof!", "Where did the king keep his armies? In his sleevies!", "What's a dog's favorite pizza? Pupperoni!",
"Who made the round table? Sir Cumference!", "What do all the geometry nerds do in the park? They get high on potenuse!", 
"Why do you never give Elsa a balloon? Because she'll let it go, let it go!", "Why don't you play card games with cats? They're big cheetahs!",
"Where do you find a dog with no legs? Where you left it!"];

var reconnect = function(){ if(kill != true)bot.connect('angelic-craft'); };

bot.on('close', reconnect);
bot.on('error', reconnect);

/*
 * Utility commands, such as for string operations
 */
 
if (typeof String.prototype.startsWith != 'function'){
	String.prototype.startsWith = function (str){
		return this.indexOf(str) === 0;
	};
}

if (typeof String.prototype.startsWith != 'function'){
	String.prototype.startsWith = function (str){
		return this.indexOf(str) === this.length - str.length;
	};
}

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