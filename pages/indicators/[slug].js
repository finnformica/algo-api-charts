import React from "react";
import { useState } from "react";
import dynamic from "next/dynamic";

// import MUI inputs
import { UserInputs } from "../../components/UserInputs";

// custom hook for async fetching data
import useRequest from "../../components/useRequest";

// config for candlestick chart
import { series, options } from "../../utils/config";

// url for api
import { urlString } from "../../utils/utils";

// available routes from api
import { slugs } from "../../utils/constants";

// dynamically load component with no SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// TO-DO LIST
// connect inputs to parent states for url
// handle button click event
// update URL when indicator is selected
// add oscillators chart in ternary operator

const IndicatorPage = ({ slug }) => {
  const [ticker, setTicker] = useState("MSFT");
  const [start, setStart] = useState("2019-01-01");

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

      <UserInputs />
    </>
  );
};

// only allow selected routes, replace list with programmatic solution
export async function getStaticPaths() {
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
