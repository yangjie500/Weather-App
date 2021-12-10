import "normalize.css";
import "./css/styles.css";
import "./css/styles-large.css";
import PubSub from "pubsub-js";

import switchDOM from "./modules/switchDOM";
import inputDOM from "./modules/inputDOM";
import apiFunction from "./modules/data";
import CurrentWeatherDisplay from "./modules/currentWeatherDisplay";
import CurrentWeatherDisplayExtra from "./modules/currentWeatherDisplayExtra";
import DailyDisplay from "./modules/dailyDisplay";
import HourlyDisplay from "./modules/hourlyDisplay";

async function main() {
  await initiate("FIRST", "Singapore");

  const TOPIC = "get-input";

  PubSub.subscribe(TOPIC, getNewWeather);

  const switchBtn = new switchDOM();
  switchBtn.linkEvent();
  const inputDom = new inputDOM();
  inputDom.linkEvent();
}

async function getNewWeather(msg: string, name: string) {
  let gotRespond = true;
  gotRespond = await apiFunction.parseData(msg, name);
  if (gotRespond === false) {
    const errorSpan = document.querySelector(".error-message") as HTMLSpanElement;
    errorSpan.textContent = "Country not found. Please retry again";
    return;
  } else {
    const errorSpan = document.querySelector(".error-message") as HTMLSpanElement;
    errorSpan.textContent = "";
  }

  const currentWeatherDisplay = new CurrentWeatherDisplay(name, apiFunction.getWeatherDataParsed().current);
  currentWeatherDisplay.render();
  const currentWeatherDisplayExtra = new CurrentWeatherDisplayExtra(apiFunction.getWeatherDataParsed().current);
  currentWeatherDisplayExtra.render();
  const dailyDisplay = new DailyDisplay(apiFunction.getWeatherDataParsed().daily);
  dailyDisplay.render();
  const hourlyDisplay = new HourlyDisplay(apiFunction.getWeatherDataParsed().hourly);
  hourlyDisplay.render();
}

async function initiate(msg: string, name: string) {
  await apiFunction.parseData(msg, name);

  const currentWeatherDisplay = new CurrentWeatherDisplay(name, apiFunction.getWeatherDataParsed().current);
  currentWeatherDisplay.render();
  const currentWeatherDisplayExtra = new CurrentWeatherDisplayExtra(apiFunction.getWeatherDataParsed().current);
  currentWeatherDisplayExtra.render();
  const dailyDisplay = new DailyDisplay(apiFunction.getWeatherDataParsed().daily);
  dailyDisplay.render();
  const hourlyDisplay = new HourlyDisplay(apiFunction.getWeatherDataParsed().hourly);
  hourlyDisplay.render();
}

main();

//testing();
