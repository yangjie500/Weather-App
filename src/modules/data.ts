// interface weatherData {
//   [key: string]: (a: string, b: string) => void;
// }
import utils from "./utils";

interface CurrentData {
  dt: number;
  max: number;
  min: number;
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

interface HourlyData {
  dt: number;
  temp: number;
  weather: {
    icon: string;
  }[];
}

interface DailyData {
  dt: number;
  temp: {
    max: number;
    min: number;
  };
  weather: {
    icon: string;
  }[];
}

interface Response {
  current: CurrentData;
  daily: DailyData[];
  hourly: HourlyData[];
  lat: number;
  lon: number;
  //minutely: object[];
  //timezone: string;
  //timezone_offset: number;
}

interface DailyParsed {
  dt: number;
  day: string;
  maxTemp: number;
  minTemp: number;
  icon: string;
}

interface HourlyParsed {
  dt: number;
  hour: string;
  temp: number;
  icon: string;
}

interface CombinedWeatherData {
  current: CurrentData;
  daily: DailyParsed[];
  hourly: HourlyParsed[];
}

const apiFunction = () => {
  let final: CombinedWeatherData;
  let dailyDataArray: DailyParsed[] = [];
  let hourlyDataArray: HourlyParsed[] = [];

  // const fetchWeatherToday = async (countryName: string) => {
  //   try {
  //     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${process.env.API_KEY}&units=metric`, {
  //       mode: "cors"
  //     });

  //     const json = await response.json();
  //     console.log(json);
  //     return {
  //       max: json.main.temp_max,
  //       min: json.main.temp_min
  //     };
  //   } catch (error) {
  //     return {
  //       max: 0,
  //       min: 0
  //     };
  //   }
  // };

  const fetchWeatherData = async (countryName: string) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${process.env.API_KEY}&units=metric`, {
        mode: "cors"
      });

      const json = await response.json();
      const lon: number = json.coord.lon;
      const lat: number = json.coord.lat;

      const response1 = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`,
        {
          mode: "cors"
        }
      );

      const json1: Response = await response1.json();
      return json1;
    } catch (error) {
      console.log(error);
    }
  };

  const getHourlyData = (weatherData: Response): void => {
    const { hourly } = weatherData;

    for (let i = 1; i < 25; i++) {
      const tempObj: HourlyParsed = {
        dt: hourly[i].dt,
        hour: utils.getHour(hourly[i].dt),
        temp: hourly[i].temp,
        icon: hourly[i].weather[0].icon
      };

      hourlyDataArray.push(tempObj);
    }
  };

  const getDailyData = (weatherData: Response): void => {
    const { daily } = weatherData;

    for (let i = 1; i < 8; i++) {
      const tempObj: DailyParsed = {
        dt: daily[i].dt,
        day: utils.getDay(daily[i].dt),
        maxTemp: daily[i].temp.max,
        minTemp: daily[i].temp.min,
        icon: daily[i].weather[0].icon
      };

      dailyDataArray.push(tempObj);
    }
  };

  const getCurrentData = (weatherData: Response): CurrentData => {
    const { current } = weatherData;

    return current;
  };

  const parseData = async (msg: string, countryName: string) => {
    dailyDataArray = [];
    hourlyDataArray = [];

    let weatherData: Response;
    const fetchData: Response | void = await fetchWeatherData(countryName);

    if (fetchData) {
      weatherData = fetchData;
    } else {
      return; // Function to ask User to re-input their country name
    }

    getCurrentData(weatherData); // in Object
    getHourlyData(weatherData); // Get them and push them into Array
    getDailyData(weatherData); // Get them and push them into Array

    const newWeatherDataParsed = {
      current: getCurrentData(weatherData),
      daily: dailyDataArray,
      hourly: hourlyDataArray
    };

    setWeatherDataParsed(newWeatherDataParsed);
  };

  const setWeatherDataParsed = (newWeatherDataParsed: CombinedWeatherData): void => {
    final = newWeatherDataParsed;
    console.log(final, "Im suppose to be ran first");
  };

  const getWeatherDataParsed = () => {
    console.log(final, "here");
    return final;
  };

  return {
    parseData,
    getWeatherDataParsed
  };
};

const weatherData = apiFunction();

export default weatherData;
