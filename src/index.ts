import "normalize.css";
import "./css/styles.css";
import "./css/styles-large.css";

import switchDOM from "./modules/switchDOM";

const call = async () => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=singapore&appid=${process.env.API_KEY}&units=metric`, {
      mode: "cors"
    });
    const json = await response.json();
    const lon: number = json.coord.lon;
    const lat: number = json.coord.lat;
    console.log("current Weather", json);

    const response1 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`, {
      mode: "cors"
    });
    const json1: object = await response1.json();
    console.log(json1);
  } catch (error) {
    console.log(error);
  }
};

call();

const switchBtn = new switchDOM();
switchBtn.linkEvent();
