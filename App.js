const { ipcRenderer } = require("electron");

const { Chart, LineController, LineElement, PointElement, LinearScale, Title, RadarController } = require("chart.js");
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
    var ctx = document.getElementById("myChart");

    // ipcRenderer.on("messageEmbedDiscord", this.onMessageEmbed.bind(this));
  }

  drawChart() {
   
   

    var data1 = {
      labels: [
        "HAPPINESS",
        "JEALOUSY",
        "LOVE",
        "FEAR",
        "ANGRINESS",
        "SADNESS",
      ],
      datasets: [
        {
          label: "USER1",
          backgroundColor: "rgba(255,255,255,0.0)",
          borderColor: "rgba(0,0,0,1)",
          borderColor: "rgba(0,0,0,1)",
          borderColor: "rgba(0,0,0,1)",
          pointHoverBackgroundColor: "rgba(28,78,214,1)",
          pointHoverBorderColor: "rgba(28,78,214,1)",
          data: [65, 59, 90, 81, 56, 55],
        },
        {
          label: "USER2",
          backgroundColor: "rgba(255,255,255,0.0)",
          borderColor: "rgba(0,0,0,1)",
          borderColor: "rgba(0,0,0,1)",
          borderColor: "rgba(0,0,0,1)",
          pointHoverBackgroundColor: "rgba(28,78,214,1)",
          pointHoverBorderColor: "rgba(28,78,214,1)",
          data: [28, 48, 40, 19, 96, 27],
        },
        {
          label: "USER3",
          backgroundColor: "rgba(255,255,255,0.0)",
          borderColor: "rgba(0,0,0,1)",
          borderColor: "rgba(0,0,0,1)",
          borderColor: "rgba(0,0,0,1)",
          pointHoverBackgroundColor: "rgba(28,78,214,1)",
          pointHoverBorderColor: "rgba(28,78,214,1)",
          data: [52, 30, 100, 67, 23, 27],
        },
      ],
    };

    var data2 =  {
      labels:  ["USER1","USER2","USER3","USER4","USER5","USER6",],
      datasets: [{
        label: false,
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(0, 0, 0, 1)',   
        ],
        borderColor: [
          'rgba(0, 0, 0, 0)',   
        ],
        borderWidth: 1.5
      }]
    };

    var data3  = {
      labels:  ["HAPPINESS","JEALOUSY","LOVE","FEAR","ANGRINESS","SADNESS",],
      datasets: [{
        backgroundColor: [
          'rgba(0, 0, 0, 1)',   
        ],
        data: [{
          x: 0,
          y: 30,
          r: 15,
          name: "Performance", 
          label:1,
        }, {
          x: 20,
          y: 30,
          r: 60
        },
        {
          x: 40,
          y: 30,
          r: 10
        },
        {
          x: 60,
          y: 30,
          r: 50
        },
        {
          x: 80,
          y: 30,
          r: 20
        }],
      }]
    };

    var options3 = {
      plugins: {
        legend: {
            display: false,
        }
      },
      hoverBackgroundColor: "blue",
      scales: {
        x:{
          ticks:{
            color:"transparent",
            font:{
              size:15,
            }

          },
          grid:{
            display:false,
            drawBorder:false,
          },
        
          
        },
        y:{
          ticks:{
            display:false,
          },
          grid:{
            display:false,
            drawBorder:false,
          },
          
        }
      }
    };
    var options2 = {
      plugins: {
        legend: {
            display: false,
        }
      },
      barThickness: 10,
      hoverBackgroundColor: "blue",
      scales: {
        x:{
          ticks:{
            color:"black",
            font:{
              size:15,
            }

          },
          grid:{
            display:false,
            drawBorder:false,
          },
        
          
        },
        y:{
          ticks:{
            display:false,
          },
          grid:{
            display:false,
            drawBorder:false,
          },
          
        }
      }
    }


    var options1 = {
     layout:{
      padding:10
     },
      responsive: true,
      borderWidth: 1.5,
      pointRadius:0,
      pointHoverRadius:15,
      pointHitRadius:40,
      tooltips: {
        enabled: false,
      },
      plugins:{
        legend:{
          display: false,
          labels:{
            boxHeight:50,
            color:"black"
          }
        },
        tooltips:{
          enabled:true,
          titleColor: "red",
        }
      },
      
      scales: {
        r:{
          grid: {
            display: false,
          },
          ticks: {
            display:false,
           },
           angleLines: {
             display:false,
           },
           gridLines: {
             display:false,
             tickMarkLength: 0
           },
           pointLabels: {
             color:"black",
             font:{
               size:15,

             },
          },
          suggestedMin: 50,
          suggestedMax: 120
        }
      }
    };

    var chart1 = document.getElementById("chart1");
    var chart2 = document.getElementById("chart2");
    var chart3 = document.getElementById("chart3");
    // Chart.defaults.font.size = 26;
    Chart.defaults.font.family = "inter";
    Chart.defaults.plugins.tooltip.enabled = false;
    

    
    var radarChart = new Chart(chart1, {
      type: "radar",
      data: data1,
      options: options1,
    });  

    var barChart = new Chart(chart2, {
      type: "bar",
      data: data2,
      options: options2,
    }); 

    var bubbleChart = new Chart(chart3, {
      type: "bubble",
      data: data3,
      options: options3,
    }); 
    
    
  }
  onMessage(event, message) {
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
