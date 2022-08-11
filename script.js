import { getCurrentWeather, getHourlyWeather } from "./api.js";

//dateTime
setInterval(() => {
  let date = new Date();
  date = date.toString();
  date = date.slice(0, date.indexOf("GMT"));
  const timeBlock = document.querySelector(".local-data__time");
  timeBlock.textContent = date;
}, 1000);

const currentWeather = async function () {
  const temp = document.querySelector(".current-weather__params__temp");
  const windSpeed = document.querySelector(
    ".current-weather__params__windspeed"
  );
  const windDirection = document.querySelector(
    ".current-weather__params__winddirection"
  );
  const weather = await getCurrentWeather();

  temp.textContent = "Temperature: " + weather.temperature + " ℃";
  windSpeed.textContent = "Wind speed: " + weather.windspeed + " km/h";
  windDirection.textContent =
    "Wind direction: " + windConvert(weather.winddirection);
};
currentWeather();

const windConvert = function (grade) {
  if (grade >= 315 && grade < 45) {
    return "North";
  } else if (grade >= 45 && grade < 135) {
    return "East";
  } else if (grade >= 135 && grade < 180) {
    return "South";
  } else {
    return "West";
  }
};

const createHour = async function (time, temp, windspeed, rain, clouds) {
  const template = document.querySelector(".hourly__block--template");
  const board = document.querySelector(".hourly");
  const newBlock = document.createElement("div");

  newBlock.innerHTML = template.innerHTML;
  newBlock.classList.add("hourly__block");

  const timeBlock = newBlock.querySelector(".hourly__block__time");
  const tempBlock = newBlock.querySelector(".hourly__block__temp");
  const windBlock = newBlock.querySelector(".hourly__block__wind");
  const rainBlock = newBlock.querySelector(".hourly__block__rain");
  const cloudsBlock = newBlock.querySelector(".hourly__block__clouds");

  timeBlock.textContent = time;
  tempBlock.textContent = "Temperature: " + temp + " ℃";
  windBlock.textContent = "Wind speed: " + windspeed + " km/h";
  rainBlock.textContent = "Rain: " + rain + "mm";
  cloudsBlock.textContent = "Cloudcover: " + clouds + "%";
  board.append(newBlock);
};

const getHourly = async function () {
  const weather = await getHourlyWeather();

  console.log(weather);

  for (const i in weather.time) {
    createHour(
      weather.time[i],
      weather.temperature_2m[i],
      weather.windspeed_10m[i],
      weather.rain[i],
      weather.cloudcover[i]
    );
  }
};
getHourly();
