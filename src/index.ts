import "normalize.css";
import "./css/styles.css";
import "./css/styles-large.css";
import PubSub from "pubsub-js";
//import { format } from "date-fns";

import switchDOM from "./modules/switchDOM";
import inputDOM from "./modules/inputDOM";
import apiFunction from "./modules/data";
//import utils from "./modules/utils";
// import testing from "./modules/test";

async function main() {
  await apiFunction.parseData("FIRST", "Singapore");
  apiFunction.getWeatherDataParsed();

  const TOPIC = "get-input";

  PubSub.subscribe(TOPIC, helperFunction);

  const switchBtn = new switchDOM();
  switchBtn.linkEvent();
  const inputDom = new inputDOM();
  inputDom.linkEvent();
}

async function helperFunction(msg: string, name: string) {
  await apiFunction.parseData(msg, name);
  apiFunction.getWeatherDataParsed();
}

main();

//testing();
