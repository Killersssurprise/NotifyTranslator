# NotifyTranslator
Free Opensource Translator for linux (mac and windows next) from the clipboard using Google Translate

This is a solution I use for personal cases. Sometimes it takes too much time to get into browser and check translation of a word or sentence. As I use linux ubuntu system it support X11 Clipboard which allow you just select text and insert it via middle mouse click or alt+insert anywhere. I found it as useful tool.
So it was wondering, can I just select some text and translate it. The answer is yes! Now you can do it too. 

![](https://raw.githubusercontent.com/Killersssurprise/NotifyTranslator/main/public/how_it_work.gif)

Project uses some bash and nodejs scripts.   

To use it you have to be sure you've installed:
1) nodejs and npm. 

Refresh your local package index first by typing:
```sh
sudo apt update
```
Then install Node.js:
```sh
sudo apt install nodejs
```
Then install npm:

```sh
sudo apt install npm
```

2) xclip.
```sh
sudo apt install xclip
```
3) after you installed it all just make npm install command to get all dependencies
```sh
npm install
```
4) The next step is find and check if everything works. You can run it manually using bash script
```sh
sh /whereyourprojectlocated/logic/start.sh  Don't forget select some text before
```
5) Set hot key. Settings -> Keyboard -> Key combination -> additional key combinations. Then set Name for your combination, as run command use from 4 step and set hot key. I use alt+T  (alt + translate for good memorizing) 

<img src="https://raw.githubusercontent.com/Killersssurprise/NotifyTranslator/main/public/screenshot.png" alt="text" width="640" height="460"> 

That's all ^_^
