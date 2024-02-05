// import React from "react";
// import { useEffect, useState } from "react";

// const APIId = "02937a6eb551b73e4de765a768998861";

// export const useWeather = (cityName) => {
//   const [weatherData, setWeatherData] = useState(null);

//   useEffect(() => {
//     async function getData() {
//       const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIId}`;
//       try {
//         const data = await fetch(url);
//         const jsonData = await data.json();
//         setWeatherData(jsonData);
//       } catch (e) {
//         setWeatherData([]);
//       }
//     }

//     getData();
//   }, [cityName]);

//   return weatherData;
// };
