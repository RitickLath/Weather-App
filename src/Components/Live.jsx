import React, { useEffect, useState } from "react";
import { Datee } from "../Helper/Date";
import { APIId } from "../Helper/info";
import Clear from "../assets/Images/Clear.jpg";
import Cloud from "../assets/Images/Cloud.jpg";
import Drizzle from "../assets/Images/Drizzle.jpg";
import Mist from "../assets/Images/Mist.jpg";
import Rain from "../assets/Images/Rain.jpg";
import Snow from "../assets/Images/Snow.jpg";
import Thunderstrom from "../assets/Images/Thunderstrom.jpg";
import { data } from "autoprefixer";

function Live() {
  const [bg, setbg] = useState(Clear);
  const [location, setLocation] = useState([null, null]);
  const [cityData, setCityData] = useState({});

  // Get Current Lat , long
  useEffect(() => {
    async function CurrentPosition() {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        setLocation([position.coords.latitude, position.coords.longitude]);
      } catch (error) {
        setLocation([null, null]);
      }
    }

    CurrentPosition();
    console.log(location);
  }, []);

  // Get Weather of that place

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=${APIId}`
        );
        const json = await data.json();
        console.log("json" + json);

        // set citydata
        setCityData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, [location]);

  // Update the background
  useEffect(() => {
    const weatherDescription = cityData?.weather?.[0]?.main;

    if (weatherDescription === "Clear") {
      setbg(Clear);
      console.log("Clear");
    } else if (weatherDescription === "Clouds") {
      setbg(Cloud);
      console.log("Cloud");
    } else if (weatherDescription === "Drizzle") {
      setbg(Drizzle);
      console.log("Drizzle");
    } else if (weatherDescription === "Rain") {
      setbg(Rain);
      console.log("Rain");
    } else if (weatherDescription === "Thunderstorm") {
      setbg(Thunderstrom);
      console.log("Thunderstorm");
    } else if (weatherDescription === "Snow") {
      setbg(Snow);
      console.log("Snow");
    } else if (
      weatherDescription === "Mist" ||
      weatherDescription === "Smoke" ||
      weatherDescription === "Haze" ||
      weatherDescription === "Dust" ||
      weatherDescription === "Ash" ||
      weatherDescription === "Sand" ||
      weatherDescription === "Squall" ||
      weatherDescription === "Fog" ||
      weatherDescription === "Tornado"
    ) {
      setbg(Mist);
      console.log("Mist , Smoke, Haze, Dust, Ash, Sand, Squall, Fog, Tornado");
    } else {
      console.log("Default: Sunny or other");
    }
    console.log(cityData);
  });

  return (
    <div
      style={{ backgroundImage: `url(${bg})`, filter: "blur(0.7px)" }}
      className="z-40 bg-cover flex flex-col justify-between py-4 px-4 w-[45%] h-[80%] lg:w-[35%] "
    >
      <div className="flex flex-col text-right font-sans text-lg font-semibold text-white">
        <h1>{cityData?.name}</h1>
        <h1 className="-mt-1">{cityData?.sys?.country}</h1>
      </div>

      <div>
        <div>{}</div>
        <div className="flex justify-between">
          <h1 className="mt-6 text-white text-lg">{Datee}</h1>
          <h1 className="text-white text-6xl">
            {Math.round(cityData?.main?.temp - 273)}°
            <span className="text-3xl">C</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Live;
