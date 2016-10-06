# AngelicBot
An open-source bot, developed for the AngelicCraft community.
AngelicCraft can be found at their [website](http://angeliccraft.net) or on Minecraft at mc.angeliccraft.net

## Commands
Commands are currently contained in the /commands directory, in individual .js files. They are imported in the main file, and contain an init method, to set up variables and values, an exectue method, which is called when the command is run, and a method for each event they listen to.
Commands can be run from chat, by sending a message prefixed with an exclamation mark (!) and followed by the command name and arguments.

The current list of commands and their usages is as follows:
- AutoWoot (!autowoot, !autow, !aw)
- Joke (!joke, !j)
- Random Dog (!dog, !rdog, !randdog, !dogs)
- Random Cat (!cat, !rcat, !randcat, !cats)
- About (!about, !info, !a)