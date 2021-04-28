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
  }

  onMessage(message) {
    const receivedEmbed = message.embeds[0];
    //console.log(message.content);

    if (receivedEmbed) {
      this.win.webContents.send("messageDiscord", receivedEmbed);
      console.log(receivedEmbed);
    } else {
      this.win.webContents.send("messageDiscord", message.content);

      var members = message.guild.members;
      members.fetch().then((data) => {
        data.forEach((member) => {
          this.users.push(member);
        });
        for (let i = 0; i < this.users.length; i++) {
          console.log(
            this.users[i].user.id + "   " + this.users[i].user.username
          );
        }
      });
    }
  }
}

module.exports = { Bot };
