import utils from "./utils";
interface HourlyParsed {
  dt: number;
  hour: string;
  temp: number;
  icon: string;
}

export default class HourlyDisplay {
  hourlyData: HourlyParsed[];
  dataTuple: [string, string, string];
  dataArray: [string, string, string][];

  hourlyHTML: HTMLCollection;

  constructor(hourlyData: HourlyParsed[]) {
    this.hourlyData = hourlyData;
    this.dataTuple = ["nothing", "nothing", "nothing"];
    this.dataArray = [];

    this.hourlyHTML = document.getElementsByClassName("hourly") as HTMLCollection;
    console.log(this.hourlyHTML);
    this.dataSwitchObjToTuples();
  }

  private dataSwitchObjToTuples() {
    for (let i = 0; i < this.hourlyData.length; i++) {
      this.dataTuple = [this.hourlyData[i].hour, this.hourlyData[i].icon, utils.roundToOneDecimal(this.hourlyData[i].temp).toString()];
      this.dataArray.push(this.dataTuple);
    }
    console.log(this.dataArray);
  }

  private removePrevData(elem: Element) {
    while (elem.lastChild) {
      elem.firstChild?.remove();
    }
  }

  private addTemp(elem: Element, value: string) {
    if (elem.className === "hourly-temp") {
      this.removePrevData(elem);

      const div = document.createElement("div");
      div.textContent = value;
      const span = document.createElement("span");
      span.textContent = "o";
      elem.append(div, span);
    }
  }

  private addOthers(elem: Element, value: string) {
    if (elem.className !== "hourly-temp") {
      elem.textContent = value;
    }
  }

  public render() {
    for (let i = 0; i < this.hourlyHTML.length; i++) {
      for (let j = 0; j < this.hourlyHTML[i].children.length; j++) {
        if (this.hourlyHTML[i].children[j].tagName === "IMG") {
          const x = this.hourlyHTML[i].children[j] as HTMLImageElement;
          x.src = `http://openweathermap.org/img/wn/${this.dataArray[i][j]}@2x.png`;
        } else {
          this.addOthers(this.hourlyHTML[i].children[j], this.dataArray[i][j]);
          this.addTemp(this.hourlyHTML[i].children[j], this.dataArray[i][j]);
        }
      }
    }
  }
}
