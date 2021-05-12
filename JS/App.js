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

var CHART2;
//const robot = require("robotjs");
class App {
  constructor() {
    console.log("LOG depuis la page HTML ROBOT");
    // const screenSize = robot.getScreenSize();
    // this.height = screenSize.height;
    // this.width = screenSize.width;
    this.chartsPage1Drawn = false;
    //this.members;
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
  }


  fillUserList(event, userList) {
    const data2json = "./JS/ChartData/data2.json";
    const data2 = require(data2json);
    userList.pop();
    //this.members = userList;
    data2.labels = userList;

    const data1json = "./JS/ChartData/data1.json";
    const data1 = require(data1json);
    for (let i = 0; i < userList.length; i++) {
      data1.datasets[i].label = userList[i];
    }

    fs.writeFile(data2json, JSON.stringify(data2), function writeJSON(err) {
      if (err) return console.log(err);
      //console.log(JSON.stringify(data2));
      //console.log('writing to ' + data2json);
    });

    fs.writeFile(data1json, JSON.stringify(data1), function writeJSON(err) {
      if (err) return console.log(err);
      //console.log(JSON.stringify(data2));
      //console.log('writing to ' + data2json);
    });

    this.drawAllCharts();
  }

  drawChart1() {
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

  drawChart2() {
    var data2 = require("./JS/ChartData/data2.json");
    var options2 = require("./JS/ChartData/options2.json");
    var chart2canvas = document.getElementById("chart2");

    if (chart2canvas != null) {
      this.chart2 = new Chart(chart2canvas, {
        type: "bar",
        data: data2,
        options: options2,
        events:["click"]
      });
    }

    this.chart2.options.onClick = this.clickChart.bind(this);
    //this.chart2.options.onClick = this.clickChart();

    
  }

  clickChart(event, labels) {
    let clickedElement = this.chart2.getElementsAtEventForMode(event, 'nearest',{ intersect: true }, true);
    console.log(clickedElement[0].index)
 }

  drawChart3() {
    var data3 = require("./JS/ChartData/data3.json");
    var options3 = require("./JS/ChartData/options3.json");
    var chart3canvas = document.getElementById("chart3");

    if (chart3canvas != null) {
      this.chart3 = new Chart(chart3canvas, {
        type: "bubble",
        data: data3,
        options: options3,
      });
    }
  }

  drawChart4() {
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

  // onClick(){
  //   console.log("clicked from app");
  //   $("#chart2").click(function(e) {
      
  //     var activePoints = app.this.chart2.getElementsAtEvent(e);

  //     // let's say you wanted to perform different actions based on label selected
  //     if (activePoints[0]._model.label == "label you are looking for") {}
  //     console.log(activePoints)

  //     //app.onClick();
  //   });
  // }

 
  onMessage(event, message) {
    const data3json = "./JS/ChartData/data3.json";
    const data3 = require(data3json);

    const data1json = "./JS/ChartData/data1.json";
    const data1 = require(data1json);

    const data4json = "./JS/ChartData/data4.json";
    const data4 = require(data4json);

    const loveJson = "./JS/Dictionnary/love.json";
    const love = require(loveJson);

    const angerJson = "./JS/Dictionnary/anger.json";
    const anger = require(angerJson);

    const happyJson = "./JS/Dictionnary/happy.json";
    const happy = require(happyJson);

    const emotions = [love, anger, happy];
    console.log(emotions);
    var points;
    var emotionIndex;

    
    //this.chart4.getDatasetMeta(0).data[4].hidden = true; 
    //checker si le message envoyé fait partie des dictionnaires d'emotions
    for (let i = 0; i < emotions.length; i++) {
      if (emotions[i].hasOwnProperty(message.content)) {
        //récupérer les points attribués au mot-clé
        points = emotions[i][message.content];
        emotionIndex = i;
        // i = 0 -> love // i = 1 -> anger // i = 2 -> ...
        console.log(emotionIndex);
        console.log(points);

        ///CHART 3
        var currPoints3 = data3.datasets[emotionIndex].data[0].r;
        data3.datasets[emotionIndex].data[0].r = currPoints3 + points;

        // fs.writeFile(data3json, JSON.stringify(data3), function writeJSON(err) {
        //     if (err) return console.log(err);
        //   });
        //   this.chart3.destroy();
        //   this.drawChart3();

        ///CHART 1
        //checker quel est l'index du dataset de l'user
        for (let i = 0; i < data1.datasets.length; i++) {
          if (message.author == data1.datasets[i].label) {
            console.log("the member is" + message.author);

            //modifier les points de la bonne émotion sur le bon user
            var currPoints1 = data1.datasets[i].data[emotionIndex];
            console.log(currPoints1);
            data1.datasets[i].data[emotionIndex] = currPoints1 + points;
            console.log(data1.datasets[i].data[emotionIndex]);
          }

        //   fs.writeFile(data1json, JSON.stringify(data1), function writeJSON(err) {
        //       if (err) return console.log(err);
        //     });  
        //   this.chart1.destroy();
        //   this.drawChart1();

        ///CHART 4
        // copier les données de chart 1 dans chart 4
          fs.writeFile(data4json, JSON.stringify(data1), function writeJSON(err) {
              if (err) return console.log(err);
            });  
        //cacher les users pas concernés     
        console.log(this.chart4.getDatasetMeta(0));
        this.chart4.getDatasetMeta(1).hidden = true;
        this.chart4.update();
       


        }

      
      
      }
    }

    //reset CHART3 radius
    // for (let i = 0; i < data3.datasets.length; i++) {
    //   data3.datasets[i].data[0].r = 15;
    // }
  }



  
}
window.onload = () => {
  app = new App();
  app.drawAllCharts();
};





