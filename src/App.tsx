import React from "react";

import GlobalStats from "./components/GlobalStats";
import CountryStats from "./components/CountryStats";

const App = () => {
  return (
    <div className='app container'>
      <h1 className='primary-title'>Global Covid-19 Update</h1>
      <GlobalStats />
      <CountryStats />
    </div>
  );
};

export default App;
