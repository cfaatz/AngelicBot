/*
 * Basic command info, for the core to process
 */

var permLevel = 0;
var name = "Joke";
var desc = "Tells a funny joke.";
var cmd = "joke";
var aliases = ["j"];
var jokes = ["What do you call a cow with no legs? Ground beef!", "What's a duck's favorite dip? Quackamole!", 
"Past, present, and future walked into a bar... it was tense.", "How do you tell the difference between an alligator and a crocodile? You'll see one later and the other in a while!",
"Three men walked into a bar... They were rather embarrassed.", "Have you heard about that new duck vet? I heard he's a real quack.",
"Where should you look to find a lost dog? On the woof!", "Where did the king keep his armies? In his sleevies!", "What's a dog's favorite pizza? Pupperoni!",
"Who made the round table? Sir Cumference!", "What do all the geometry nerds do in the park? They get high on potenuse!", 
"Why do you never give Elsa a balloon? Because she'll let it go, let it go!", "Why don't you play card games with cats? They're big cheetahs!",
"Where do you find a dog with no legs? Where you left it!"];


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