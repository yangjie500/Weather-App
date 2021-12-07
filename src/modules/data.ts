// interface weatherData {
//   [key: string]: (a: string, b: string) => void;
// }

interface hourlyData {
  dt: number;
  temp: number;
  weather: object;
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

interface response {
  current: object;
  daily: DailyData[];
  hourly: hourlyData[];
  lat: number;
  lon: number;
  minutely: object[];
  timezone: string;
  timezone_offset: number;
}

const apiFunction = () => {
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

      const json1: response = await response1.json();
      return json1;
    } catch (error) {
      console.log(error);
    }
  };

  const getHourlyData = (weatherData: response) => {
    const { hourly } = weatherData;
  };

  const getDailyData = (weatherData: response) => {
    const { daily } = weatherData;
    const dailyData: {
      dt: number;
      maxTemp: number;
      minTemp: number;
      icon: string;
    }[] = [];

    console.log(weatherData);
    for (let i = 1; i < daily.length; i++) {
      const tempObj = {
        dt: daily[i].dt,
        maxTemp: daily[i].temp.max,
        minTemp: daily[i].temp.min,
        icon: daily[i].weather[0].icon
      };

      dailyData.push(tempObj);
    }

    console.log(dailyData);
  };

  const parseData = async (msg: string, countryName: string) => {
    let weatherData: response;
    const fetchData: response | void = await fetchWeatherData(countryName);
    if (fetchData) {
      weatherData = fetchData;
    } else {
      return;
    }
    getHourlyData(weatherData);
    getDailyData(weatherData);
  };

  return {
    parseData
  };
};

const weatherData = apiFunction();

export default weatherData;
