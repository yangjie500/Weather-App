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

export default class CurrentWeatherDisplay {
  country: string;
  weather: string;
  temp: number;
  countryHTML: HTMLHeadingElement;
  weatherHTML: HTMLHeadingElement;
  tempHTML: HTMLHeadingElement;

  constructor(name: string, currentDataObj: CurrentData) {
    this.country = name;
    this.weather = currentDataObj.weather[0].main;
    this.temp = currentDataObj.temp;
    this.countryHTML = document.querySelector(".main__country") as HTMLHeadingElement;
    this.weatherHTML = document.querySelector(".main__weather") as HTMLHeadingElement;
    this.tempHTML = document.querySelector(".main__temp > div") as HTMLHeadingElement;
  }

  render() {
    this.countryHTML.textContent = this.country;
    this.weatherHTML.textContent = this.weather;
    this.tempHTML.textContent = utils.roundToOneDecimal(this.temp).toString();
  }
}
