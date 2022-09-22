import React from "react";
import { useState } from "react";
import dynamic from "next/dynamic";

// custom hook for async fetching data
import useRequest from "../../components/useRequest";

// config for candlestick chart
import { series, options } from "../../utils/config";

// url for api
import { urlString } from "../../utils/url";

// dynamically load component with no SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// TO-DO LIST
// COMPLETE: setup graph with data loaded from API
// install MUI
// place some inputs on page
// -- combo select box, API generated inputs like style analysis
// -- date picker

const IndicatorPage = ({ slug }) => {
  const ticker = "ADA-USD";
  const start = "2021-01-01";

  const [url, setUrl] = useState(urlString(slug, ticker, start));

  let { data, loading, error } = useRequest(url);

  const handleClick = (slug, ticker, start) => {
    setUrl(urlString(slug, ticker, start));
    let { data, loading, error } = useRequest(url);
  };

  return (
    <>
      {loading && <h1>Data is loading...</h1>}

      {error && <h1>Failed to fetch - {error}</h1>}

      {data &&
        (data.info.type === "overlay" ? (
          <ReactApexChart
            options={options(slug)}
            series={series(data)}
            type="candlestick"
          />
        ) : (
          <h1>oscillators in beta</h1>
        ))}
    </>
  );
};

// only allow selected routes, replace list with programmatic solution
export async function getStaticPaths() {
  const slugs = [
    "average-true-range",
    "bollinger-band",
    "ichimoku-cloud",
    "macd",
    "moving-average-crossover",
    "rsi",
    "stochastic-oscillator",
    "supertrend",
    "volatility",
  ];

  const paths = slugs.map((slug) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

// return current page slug
export async function getStaticProps({ params: { slug } }) {
  return {
    props: {
      slug,
    },
  };
}

export default IndicatorPage;
