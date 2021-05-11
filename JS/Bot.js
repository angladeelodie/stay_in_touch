const { Client, MessageEmbed } = require("discord.js");
const { Board, Led, Servo } = require("johnny-five");

class Bot {
  constructor(token, win, led, led2) {
    console.log("Bot start");

    this.win = win;
    this.client = new Client();
    this.client.on("ready", this.onReady.bind(this));
    this.client.on("message", this.onMessage.bind(this));
    this.client.login(token);
    this.list;
    this.users = [];

    //this.initArduino();
    this.led = led;
    this.led2 = led2;
  }

  initArduino() {
    this.board = new Board({ repl: false });
    this.board.on("ready", this.onBoardReady.bind(this));
    console.log("BOARD STARTED");
  }
  onBoardReady() {
    console.log("Board ready");
    // const led = new Led(9);
    // led.blink(500);
    //this.servo = new Servo(7);
    this.servo = new Servo(7);
    this.servo.center();
    this.angle = 90;

    //this.led = new Led(9);
    //     led.blink(500);
    // this.led2 = new Led(5);
    //     led2.blink(200);
  }

  onReady() {
    console.log("BOT READY");
    this.list = this.client.guilds.cache.get("831808999389134868");
    //console.log(this.list);
    this.list.members.cache.forEach(member => this.users.push(member.user.username)); 
    //console.log(this.users);
    this.win.webContents.send("userList", this.users);
  }

  onMessage(message) {
    //console.log(message.content);
    //console.log(message.author.username);
    var messageInfos = {
      content: message.content,
      author: message.author.username
    };
  
    //console.log(messageInfos);
      this.win.webContents.send("messageDiscord", messageInfos);
      //this.win.webContents.send("messageDiscord", message.content);
      
    
  }
}

module.exports = { Bot };
