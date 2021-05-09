const { ipcRenderer } = require("electron");
const $ = require("jquery");
const fs = require("fs");
let app;

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
    // const screenSize = robot.getScreenSize();
    // this.height = screenSize.height;
    // this.width = screenSize.width;
    this.chartsPage1Drawn = false;
    this.members = [];
    this.isDiscordReady = false;
    this.initListeners();
  }

  initListeners() {
    ipcRenderer.on("messageDiscord", this.onMessage.bind(this));
    ipcRenderer.on("userList", this.fillUserList.bind(this));
    //ipcRenderer.on("listMembers", this.userList.bind(this));
    // ipcRenderer.on("messageEmbedDiscord", this.onMessageEmbed.bind(this));
  }

  fillUserList(event, userList) {
    //console.log(userList);
    const data2json = "./JS/ChartData/data2.json";
    const data2 = require(data2json);
    //console.log(data2);

    data2.labels = userList;

    fs.writeFile(data2json, JSON.stringify(data2), function writeJSON(err) {
      if (err) return console.log(err);
      //console.log(JSON.stringify(data2));
      //console.log('writing to ' + data2json);
    });

    console.log("list filled");
    this.drawChart();
  }

  // fillData(){
  //     for (let i = 0; i < this.members.length; i++) {
  //       $('<span class="userName" />').text(this.members[i]).appendTo('#usersList');
  //     }
  //     console.log("data filled");
  // }

  drawChart() {
    //console.log("drawing");
    var data1 = require("./JS/ChartData/data1.json");
    var data2 = require("./JS/ChartData/data2.json");
    var data3 = require("./JS/ChartData/data3.json");
    var data4 = require("./JS/ChartData/data4.json");

    var options1 = require("./JS/ChartData/options1.json");
    var options2 = require("./JS/ChartData/options2.json");
    var options3 = require("./JS/ChartData/options3.json");
    var options4 = require("./JS/ChartData/options4.json");

    var chart1 = document.getElementById("chart1");
    var chart2 = document.getElementById("chart2");
    var chart3 = document.getElementById("chart3");
    var chart4 = document.getElementById("chart4");

    // Chart.defaults.font.size = 26;
    Chart.defaults.font.family = "Oswald";
    if (this.chartsPage1Drawn == false) {
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
    }
    this.chartsPage1Drawn = true;

    if (chart4 != null) {
      console.log("chart 4");
      var radarChart = new Chart(chart4, {
        type: "radar",
        data: data4,
        options: options4,
      });
    }
  }

  onMessage(event, message) {
    // console.log(event);
    //console.log(message);
    // this.messageCount++;
    // let characterIncrement = message.length;
    // this.characterCount = this.characterCount + characterIncrement;
    // let averageLetter = 0;
    // console.log(message);
    // let wordCountDiv = document.createElement("div");
    // let wordCountH2 = document.createElement("span");
    // let wordCountNumber = document.createElement("span");
    // let newMessage = document.createTextNode(message);
    // let wordCount = document.createTextNode(message.length);
    // wordCountH2.appendChild(newMessage);
    // wordCountNumber.appendChild(wordCount);
    // wordCountNumber.classList.add("wordCountNumber");
    // wordCountDiv.classList.add("wordCountDiv");
    // wordCountDiv.appendChild(wordCountNumber);
    // wordCountDiv.appendChild(wordCountH2);
    // document.getElementById("wordCount").appendChild(wordCountDiv);
    // document.getElementById("averageLetters").textContent =
    //   this.characterCount / this.messageCount;
    //console.log(message);
    // if (message == "L") {
    // }
  }
}
window.onload = () => {
  app = new App();
  app.drawChart();
};

// $(document).ready(function () {
//   console.log("draw chart");
//   $("#groupName").click(function () {
    
//   });
// });
