const { ipcRenderer } = require("electron");

const { Chart, registerables } = require("chart.js");
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
   
    var ctx = document.getElementById("myChart");
    ctx.chartColors = {
      red: "rgb(255, 99, 132)",
      orange: "rgb(255, 159, 64)",
      yellow: "rgb(255, 205, 86)",
      green: "rgb(75, 192, 192)",
      blue: "rgb(54, 162, 235)",
      purple: "rgb(153, 102, 255)",
      grey: "rgb(231,233,237)",
    };

    var data = {
      labels: [
        "Eating",
        "Drinking",
        "Sleeping",
        "Designing",
        "Coding",
        "Cycling",
        "Running",
      ],
      datasets: [
        {
          label: "USER1",
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBackgroundColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          data: [65, 59, 90, 81, 56, 55, 40],
        },
        {
          label: "USER2",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255,99,132,1)",
          data: [28, 48, 40, 19, 96, 27, 100],
        },
      ],
    };
    var options = {
      tooltips: {
        enabled: false,
      },
      scale: {
        ticks: {
          display: false,
          maxTicksLimit: 1
        },
        pointLabels :{
          display:true,
          fontStyle: "bold",
       }
      },
    };
    var myRadarChart = new Chart(ctx, {
      type: "radar",
      data: data,
      options: options,
    });



    myRadarChart.update(); 
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
