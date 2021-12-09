import "normalize.css";
import "./css/styles.css";
import "./css/styles-large.css";
import PubSub from "pubsub-js";
//import { format } from "date-fns";

import switchDOM from "./modules/switchDOM";
import inputDOM from "./modules/inputDOM";
import apiFunction from "./modules/data";
import CurrentWeatherDisplay from "./modules/currentWeatherDisplay";
import CurrentWeatherDisplayExtra from "./modules/currentWeatherDisplayExtra";
import DailyDisplay from "./modules/dailyDisplay";

async function main() {
  await apiFunction.parseData("FIRST", "Singapore");
  apiFunction.getWeatherDataParsed();

  const TOPIC = "get-input";

  PubSub.subscribe(TOPIC, getNewWeather);

  const switchBtn = new switchDOM();
  switchBtn.linkEvent();
  const inputDom = new inputDOM();
  inputDom.linkEvent();
}

async function getNewWeather(msg: string, name: string) {
  await apiFunction.parseData(msg, name);
  const currentWeatherDisplay = new CurrentWeatherDisplay(name, apiFunction.getWeatherDataParsed().current);
  currentWeatherDisplay.render();
  const currentWeatherDisplayExtra = new CurrentWeatherDisplayExtra(apiFunction.getWeatherDataParsed().current);
  currentWeatherDisplayExtra.render();
  const dailyDisplay = new DailyDisplay(apiFunction.getWeatherDataParsed().daily);
  dailyDisplay.render();
}

main();

//testing();
