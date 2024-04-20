import React, { useState } from "react";
import CurrentLocation from "./currentLocation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CityTable from "./table";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< CityTable />} />
          <Route path="/city" element={
            <div className="container">
              <CurrentLocation />
            </div>
          } />
        </Routes>
      </BrowserRouter>
      {/* <div className="container"> */}
      {/* < CityTable /> */}
      {/* <CurrentLocation /> */}
      {/* </div> */}

    </React.Fragment>
  );
}

export default App;
