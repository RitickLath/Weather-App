import React, { useEffect, useState } from "react";
import { APIId } from "../Helper/info";
import Clear from "../assets/Images/Clear.jpg";
import Cloud from "../assets/Images/Cloud.jpg";
import Drizzle from "../assets/Images/Drizzle.jpg";
import Mist from "../assets/Images/Mist.jpg";
import Rain from "../assets/Images/Rain.jpg";
import Snow from "../assets/Images/Snow.jpg";
import Thunderstrom from "../assets/Images/Thunderstrom.jpg";
import { IoSearchOutline } from "react-icons/io5";
import { IoPartlySunnyOutline } from "react-icons/io5";
import { FaCloud } from "react-icons/fa6";
import { BsCloudDrizzle } from "react-icons/bs";
import { FaCloudMoonRain } from "react-icons/fa";
import { FiCloudLightning } from "react-icons/fi";
import { MdOutlineSnowboarding } from "react-icons/md";
import { WiTornado } from "react-icons/wi";
import { IoIosPartlySunny } from "react-icons/io";

function Search({ bg, SetBg }) {
  const [City, SetCity] = useState("New Delhi");
  const [CityData, setCityData] = useState({});
  const [Entry, setEntry] = useState("");

  const [weatherDescription, setWeatherDescription] = useState("Dizzle");
  const [weatherIcon, setweatherIcon] = useState(null);
  // fetching data
  useEffect(() => {
    async function getData() {
      try {
        const data = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${APIId}`
        );
        const json = await data.json();
        setCityData(json);
        console.log(json);
      } catch (error) {
        setCityData({});
        console.log("Error occured on Fetching data at Live Component" + error);
      }
    }

    getData();
  }, [City]);

  // set background
  useEffect(() => {
    setWeatherDescription(CityData?.weather?.[0]?.main || "Drizzle");
    console.log("weather descriptionL- " + weatherDescription);

    if (weatherDescription === "Clear") {
      setweatherIcon(
        <IoPartlySunnyOutline className="text-[50px] text-white" />
      );
      console.log(weatherIcon);
      SetBg(Clear);
      console.log("Clear");
    } else if (weatherDescription === "Clouds") {
      SetBg(Cloud);
      setweatherIcon(<FaCloud className="text-[50px] text-white" />);
      console.log("Cloud");
    } else if (weatherDescription === "Drizzle") {
      SetBg(Drizzle);
      setweatherIcon(<BsCloudDrizzle className="text-[50px] text-white" />);
      console.log("Drizzle");
    } else if (weatherDescription === "Rain") {
      SetBg(Rain);
      setweatherIcon(<FaCloudMoonRain className="text-[50px] text-white" />);
      console.log("Rain");
    } else if (weatherDescription === "Thunderstorm") {
      SetBg(Thunderstrom);
      setweatherIcon(<FiCloudLightning className="text-[50px] text-white" />);
      console.log("Thunderstorm");
    } else if (weatherDescription === "Snow") {
      SetBg(Snow);
      setweatherIcon(
        <MdOutlineSnowboarding className="text-[50px] text-white" />
      );
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
      SetBg(Mist);
      setweatherIcon(<WiTornado className="text-[50px] text-white" />);
      console.log("Mist , Smoke, Haze, Dust, Ash, Sand, Squall, Fog, Tornado");
    } else {
      setweatherIcon(<IoIosPartlySunny className="text-[50px] text-white" />);
      console.log("Default: Sunny or other");
    }
  }, [City, CityData, weatherDescription]);

  return (
    <div
      style={{ filter: "blur(0.6px)" }}
      className="bg-transparent px-5 py-8 border-[1px] w-[50%] h-[80%] lg:w-[30%]"
    >
      {/* Weather icon and title */}
      <div className="mt-14 flex text-center justify-center space-x-2">
        {weatherIcon}
        <h1 className=" mb-3  text-5xl text-white font-bold">
          {CityData.weather?.[0]?.main}
        </h1>
      </div>
      <hr />
      <hr />

      {/* Input field and button as icon */}
      <div className="text-center  text-white">
        <input
          className="outline-none mt-6 bg-transparent placeholder-[#e7e1e1] border-b-[1px]"
          onChange={(e) => {
            setEntry(e.target.value);
          }}
          type="text"
          placeholder="Search any City"
        />
        <button
          className="align-bottom"
          onClick={() => {
            SetCity(Entry || City);
            setEntry("");
          }}
        >
          <IoSearchOutline className="text-3xl" />
        </button>
      </div>

      <h1 className="text-center mt-5 text-white text-lg font-bold">
        {CityData?.name}, {CityData?.sys?.country || ""}
      </h1>

      <div className="text-base text-white mt-5 font-bold">
        {/* Temperature */}

        <div className="mb-3 flex justify-between px-2">
          <h1>Temperature</h1>
          <h1>
            {Math.round(CityData?.main?.temp - 273)}°C (
            {CityData.weather?.[0]?.description || ""})
          </h1>
        </div>
        <hr className="mb-3" />

        {/* Humidity */}

        <div className="mb-3 flex justify-between px-2">
          <h1>Humidity</h1>
          <h1>{CityData?.main?.humidity}%</h1>
        </div>
        <hr className="mb-3" />
        {/* Visibility */}

        <div className="mb-3 flex justify-between px-2">
          <h1>Visibility</h1>
          <h1>{CityData?.visibility}mi</h1>
        </div>

        <hr className="mb-3" />
        {/* Wind Speed */}

        <div className="flex justify-between px-2">
          <h1>Wind Speed </h1>
          <h1>{CityData?.wind?.speed} km/h</h1>
        </div>
      </div>
    </div>
  );
}

export default Search;
