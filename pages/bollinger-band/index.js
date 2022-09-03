import React from "react";
import { useState } from "react";
import dynamic from "next/dynamic";

import useRequest from "../../components/useRequest";
import config from "./config";

import state from "../../data/SampleChartData.js";

// dynamically load component with no SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// setup graph with data loaded from API
// install MUI
// place some inputs on page
// -- combo select box, API generated inputs like style analysis
// -- date picker
//

const bollingerBand = () => {
  const [url, setUrl] = useState(
    "https://algo-api-app.herokuapp.com/bollinger-band"
  );
  const { data, loading, error } = useRequest(url);

  const [price, setPrice] = useState([]);
  const [signal, setSignal] = useState({});

  console.log(data.price);

  return loading ? (
    <h1>Data is loading...</h1>
  ) : (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="candlestick"
    />
  );
};

export default bollingerBand;
