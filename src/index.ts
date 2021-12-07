import "normalize.css";
import "./css/styles.css";
import "./css/styles-large.css";
import PubSub from "pubsub-js";
//import { format } from "date-fns";

import switchDOM from "./modules/switchDOM";
import inputDOM from "./modules/inputDOM";
import apiFunction from "./modules/data";
// import testing from "./modules/test";

async function main() {
  const TOPIC = "get-input";

  PubSub.subscribe(TOPIC, apiFunction.parseData);

  const switchBtn = new switchDOM();
  switchBtn.linkEvent();
  const inputDom = new inputDOM();
  inputDom.linkEvent();
}

main();

//testing();
