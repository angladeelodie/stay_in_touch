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

    this.chart1;
    this.chart2;
    this.chart3;
    this.chart4;
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
    this.drawAllCharts();
  }

  // fillData(){
  //     for (let i = 0; i < this.members.length; i++) {
  //       $('<span class="userName" />').text(this.members[i]).appendTo('#usersList');
  //     }
  //     console.log("data filled");
  // }

  drawChart1(){
    var data1 = require("./JS/ChartData/data1.json");
    var options1 = require("./JS/ChartData/options1.json");
    var chart1canvas = document.getElementById("chart1");

    if (chart1canvas != null) {
      this.chart1 = new Chart(chart1canvas, {
        type: "radar",
        data: data1,
        options: options1,
      });
    }
  }

  drawChart2(){
    var data2 = require("./JS/ChartData/data2.json");
    var options2 = require("./JS/ChartData/options2.json");
    var chart2canvas = document.getElementById("chart2");

    if (chart2canvas != null) {
      this.chart2 = new Chart(chart2canvas, {
        type: "bar",
        data: data2,
        options: options2,
      });
    }
  }

  drawChart3(){
    var data3 = require("./JS/ChartData/data3.json");
    var options3 = require("./JS/ChartData/options3.json");
    var chart3canvas = document.getElementById("chart3").getContext("2d");;

    if (chart3canvas != null) {
      
      this.chart3 = new Chart(chart3canvas, {
        type: "bubble",
        data: data3,
        options: options3,
      });
    }

    
  }

  drawChart4(){
    var data4 = require("./JS/ChartData/data4.json");
    var options4 = require("./JS/ChartData/options4.json");
    var chart4canvas = document.getElementById("chart4");


    if (chart4canvas != null) {
      console.log("chart 4");
      this.chart4 = new Chart(chart4canvas, {
        type: "radar",
        data: data4,
        options: options4,
      });
    }
  }

  drawAllCharts() {
    Chart.defaults.font.family = "Oswald";
    if (this.chartsPage1Drawn == false) {
      this.drawChart1();
      this.drawChart2();
      this.drawChart3();
    }
    this.chartsPage1Drawn = true;
    this.drawChart4();
 
  }

  onMessage(event, message) {
    
    const data3json = "./JS/ChartData/data3.json";
    const data3 = require(data3json);

    const loveJson = "./JS/Dictionnary/love.json";
    const love = require(loveJson);

    //checker si le message envoyé fait partie du dictionnaire "love"
    if(love.hasOwnProperty(message)){
      //on récupère les points indiqués à ce message dans le dicitonnaire "love"
      var points = love[message];
      console.log(points);
    }

    //   for(let i=0; i<data3.datasets.length; i++){
    //   data3.datasets[i].data[0].r = 15;
    // }


    //on ajoute les points récupérés grâce à ce message au rayon du cercle "love"
    var currPoints = data3.datasets[2].data[0].r
    data3.datasets[2].data[0].r = currPoints + points
  
  
    fs.writeFile(data3json, JSON.stringify(data3), function writeJSON(err) {
      if (err) return console.log(err);
      //console.log(JSON.stringify(data3));
      //console.log('writing to ' + data3json);
    });

    this.chart3.destroy();
    this.drawChart3();
    

    
    
    //console.log(data3);

   
  }
}
window.onload = () => {
  app = new App();
  app.drawAllCharts();
};

// $(document).ready(function () {
//   console.log("draw chart");
//   $("#groupName").click(function () {
    
//   });
// });
