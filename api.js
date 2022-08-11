async function getCurrentWeather() {
  const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=57.00&longitude=24.15&current_weather=true"
  );
  const response_json = await response.json();
  if (response.status == 200) {
    return await response_json.current_weather;
  }
}
async function getHourlyWeather() {
  const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=57.00&longitude=24.15&hourly=temperature_2m,rain,cloudcover,windspeed_10m"
  );
  const response_json = await response.json();
  if (response.status == 200) {
    return await response_json.hourly;
  }
}

export { getCurrentWeather, getHourlyWeather };
