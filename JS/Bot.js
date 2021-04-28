const { Client, MessageEmbed } = require("discord.js");
const { Board, Led, Servo} = require("johnny-five");


class Bot {
  constructor(token, win, led, led2) {
    console.log("Bot start");

    this.win = win;
    this.client = new Client();
    this.client.on("ready", this.onReady.bind(this));
    this.client.on("message", this.onMessage.bind(this));
    this.client.login(token);
    //this.initArduino();
    this.led = led; 
    this.led2 = led2;
  }

  initArduino(){
    this.board = new Board({repl:false});
    this.board.on("ready", this.onBoardReady.bind(this));
    console.log("BOARD STARTED")
  }
  onBoardReady(){
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
    

    if(receivedEmbed){
      this.win.webContents.send("messageDiscord", receivedEmbed);
      console.log(receivedEmbed);
    } else {
      this.win.webContents.send("messageDiscord", message.content);
      //console.log(message);
    //   if(this.servo && message.content == "L"){
    //     //this.servo.sweep();
    //     //console.log(this.servo);
    //     this.angle+=10
    //     this.servo.to(this.angle);
    //     console.log(this.angle);

    //     this.led = new Led(9);
    //     // this.led.blink(500);
    //     this.led.on();

    //     setTimeout(() => {
    //       this.led.off();
    //     }, 500);
    //   }
    //   if(message.content == "R"){
        
    //   //newDiv.style.marginTop = "0vh";
      
        
    //     this.angle-=10
    //     this.servo.to(this.angle);
    //     console.log(this.angle);

    //     this.led2 = new Led(5);
    //     // this.led2.blink(200);

    //     this.led2.on();
    //     setTimeout(() => {
    //       this.led2.off();
    //     }, 500);

    //     // this.led2.off();
    //   }

    //   if(this.angle >= 180){
    //     console.log("player 1 wins");
    //     setTimeout(() => {
    //       this.angle = 90;
    //       this.servo.center();
    //     }, 2000);
    //   }
    //   if(this.angle <= 0){
    //     console.log("player 2 wins");
    //     setTimeout(() => {
    //       this.angle = 90;
    //       this.servo.center();
    //     }, 2000);
        
    //   }
    }
  }
}

module.exports = { Bot };