interface DailyParsed {
  dt: number;
  day: string;
  maxTemp: number;
  minTemp: number;
  icon: string;
}

export default class DailyDisplay {
  dailyWeather: DailyParsed[];
  dailyForecastDisplay: HTMLCollection;

  dataTuples: [string, string, string, string];
  dataArray: [string, string, string, string][];

  constructor(weatherDataObj: DailyParsed[]) {
    this.dailyWeather = weatherDataObj;
    this.dailyForecastDisplay = document.getElementsByClassName("daily") as HTMLCollection;
    this.dataTuples = ["nothing", "nothing", "nothing", "nothing"];
    this.dataArray = [];

    this.dataSwitchObjToTuples();
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

  private removePrevData(elem: Element) {
    while (elem.lastChild) {
      elem.firstChild?.remove();
    }
  }

  private addTemp(elem: Element, value: string) {
    if (elem.className === "daily-high" || elem.className === "daily-low") {
      this.removePrevData(elem);

      const div = document.createElement("div");
      div.textContent = value;
      const span = document.createElement("span");
      span.textContent = "o";
      elem.append(div, span);
    }
  }

  private addOther(elem: Element, value: string) {
    if (elem.className !== "daily-high" && elem.className !== "daily-low") {
      elem.textContent = value;
    }
  }

  render() {
    for (let i = 0; i < this.dailyWeather.length; i++) {
      for (let j = 0; j < this.dailyForecastDisplay[i].children.length; j++) {
        if (this.dailyForecastDisplay[i].children[j].tagName === "IMG") {
          const x = this.dailyForecastDisplay[i].children[j] as HTMLImageElement;
          x.src = `http://openweathermap.org/img/wn/${this.dataArray[i][j]}@2x.png`;
        } else {
          this.addOther(this.dailyForecastDisplay[i].children[j], this.dataArray[i][j]);
          this.addTemp(this.dailyForecastDisplay[i].children[j], this.dataArray[i][j]);
        }
      }
    }
  }
}
