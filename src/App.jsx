import React, { useState } from "react";

import Live from "./Components/Live";
import Search from "./Components/Search";
import background from "../src/assets/Images/background.jpg";
import Clear from "../src/assets/Images/Clear.jpg";

function App() {
  const [bg, SetBg] = useState(Clear);
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="h-screen bg-cover space-x-2 flex justify-center items-center"
    >
      <Live />
      
      <Search bg={bg} SetBg={SetBg} />
    </div>
  );
}

export default App;
