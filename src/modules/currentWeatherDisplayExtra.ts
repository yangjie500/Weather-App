import utils from "./utils";
interface CurrentData {
  dt: number;
  weather: {
    main: string;
  }[];
  feels_like: number;
  humidity: number;
  sunrise: number;
  sunset: number;
  temp: number;
  wind_deg: number;
  wind_speed: number;
  pressure: number;
  visibility: number;
}

export default class CurrentWeatherDisplayExtra {
  sunrise: string;
  sunset: string;
  humidity: string;
  feels_like: string;
  windDeg: string;
  windSpeed: string;
  pressure: string;
  visibility: string;

  container: [string, string, string, string, string, string, string, string];
  detailsDIV: NodeList;

  constructor(currentWeatherObj: CurrentData) {
    this.sunrise = utils.getExactHour(currentWeatherObj.sunrise);
    this.sunset = utils.getExactHour(currentWeatherObj.sunset);
    this.humidity = currentWeatherObj.humidity.toString() + "%";
    this.feels_like = utils.roundToOneDecimal(currentWeatherObj.feels_like).toString();
    this.windDeg = currentWeatherObj.wind_deg.toString() + " deg";
    this.windSpeed = currentWeatherObj.wind_speed.toString() + " meter/s";
    this.pressure = currentWeatherObj.pressure.toString() + " hPa";
    this.visibility = currentWeatherObj.visibility.toString() + " meter";

    this.container = [this.sunrise, this.sunset, this.humidity, this.feels_like, this.windDeg, this.windSpeed, this.pressure, this.visibility];

    this.detailsDIV = document.querySelectorAll(".today-description .num") as NodeList;
  }

  render() {
    for (let i = 0; i < this.detailsDIV.length; i++) {
      this.detailsDIV[i].textContent = this.container[i];
    }
  }
}
