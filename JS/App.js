const { ipcRenderer } = require("electron");

const {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  RadarController,
} = require("chart.js");
Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
//const robot = require("robotjs");
class App {
  constructor() {
    console.log("LOG depuis la page HTML ROBOT");

    // for (let i = 0; i < 2000; i++) {
    //   const button = document.createElement("button");
    //   button.textContent = ".";
    //   document.body.appendChild(button);
    // }

    // const screenSize = robot.getScreenSize();
    // this.height = screenSize.height;
    // this.width = screenSize.width;
    this.angle = 90;
    this.widthIncrement = 5.5;
    this.angleIncrement = 10;
    this.messageCount = 0;
    this.characterCount = 0;
    this.initListeners();
    this.drawChart();
  }

  initListeners() {
    ipcRenderer.on("messageDiscord", this.onMessage.bind(this));
    // ipcRenderer.on("messageEmbedDiscord", this.onMessageEmbed.bind(this));
  }

  drawChart() {
    var data1 = require('./JS/ChartData/data1.json');
    var data2 = require('./JS/ChartData/data2.json');
    var data3 = require('./JS/ChartData/data3.json');
    var data4 = require('./JS/ChartData/data4.json');

    var options1 = require('./JS/ChartData/options1.json');
    var options2 = require('./JS/ChartData/options2.json');
    var options3 = require('./JS/ChartData/options3.json');
    var options4 = require('./JS/ChartData/options4.json');
  
    var chart1 = document.getElementById("chart1");
    var chart2 = document.getElementById("chart2");
    var chart3 = document.getElementById("chart3");
    var chart4 = document.getElementById("chart4");
    
    // Chart.defaults.font.size = 26;
    Chart.defaults.font.family = "Oswald";

    if (chart1 != null) {
      var radarChart = new Chart(chart1, {
        type: "radar",
        data: data1,
        options: options1,
      });
    }

    if (chart2 != null) {
      var barChart = new Chart(chart2, {
        type: "bar",
        data: data2,
        options: options2,
      });
    }

    if (chart3 != null) {
      var bubbleChart = new Chart(chart3, {
        type: "bubble",
        data: data3,
        options: options3,
      });
    }

    if (chart4 != null) {
      var radarChart = new Chart(chart4, {
        type: "radar",
        data: data4,
        options: options4,
      });
    }    
  }
  onMessage(event, message) {
    console.log(event);
    console.log(message);
    this.messageCount++;
    let characterIncrement = message.length;
    this.characterCount = this.characterCount + characterIncrement;
    let averageLetter = 0;

    console.log(message);

    let wordCountDiv = document.createElement("div");
    let wordCountH2 = document.createElement("span");
    let wordCountNumber = document.createElement("span");
    let newMessage = document.createTextNode(message);
    let wordCount = document.createTextNode(message.length);

    wordCountH2.appendChild(newMessage);
    wordCountNumber.appendChild(wordCount);
    wordCountNumber.classList.add("wordCountNumber");

    wordCountDiv.classList.add("wordCountDiv");

    wordCountDiv.appendChild(wordCountNumber);
    wordCountDiv.appendChild(wordCountH2);

    document.getElementById("wordCount").appendChild(wordCountDiv);
    document.getElementById("averageLetters").textContent =
      this.characterCount / this.messageCount;

    console.log(message);
    // if (message == "L") {

    // }
  }
}
window.onload = () => {
  new App();
};
