interface DailyParsed {
  dt: number;
  day: string;
  maxTemp: number;
  minTemp: number;
  icon: string;
}

export default class DailyDisplay {
  // day : string;
  // maxTemp: number;
  // minTemp: number;
  // icon: string;
  dailyWeather: DailyParsed[];
  dailyForecastDisplay: HTMLCollection;

  dataTuples: [string, string, string, string];
  dataArray: [string, string, string, string][];

  constructor(weatherDataObj: DailyParsed[]) {
    // this.day = weatherDataObj.day;
    // this.maxTemp = weatherDataObj.maxTemp;
    // this.minTemp = weatherDataObj.minTemp;
    // this.icon = weatherDataObj.icon;
    this.dailyWeather = weatherDataObj;
    this.dailyForecastDisplay = document.getElementsByClassName("daily") as HTMLCollection;
    this.dataTuples = ["nothing", "nothing", "nothing", "nothing"];
    this.dataArray = [];

    this.dataSwitchObjToTuples();
    console.log(this.dataArray);
  }

  dataSwitchObjToTuples() {
    for (let i = 0; i < this.dailyWeather.length; i++) {
      this.dataTuples = [
        this.dailyWeather[i].day,
        this.dailyWeather[i].icon,
        this.dailyWeather[i].maxTemp.toString(),
        this.dailyWeather[i].minTemp.toString()
      ];

      this.dataArray.push(this.dataTuples);
    }
  }

  render() {
    for (let i = 0; i < this.dailyWeather.length; i++) {
      for (let j = 0; j < this.dailyForecastDisplay[i].children.length; j++) {
        if (this.dailyForecastDisplay[i].children[j].tagName === "IMG") {
          const x = this.dailyForecastDisplay[i].children[j] as HTMLImageElement;
          x.src = `http://openweathermap.org/img/wn/${this.dataArray[i][j]}@2x.png`;
        }
        this.dailyForecastDisplay[i].children[j].textContent = this.dataArray[i][j];
      }
    }
  }
}
