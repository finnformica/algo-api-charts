import React from "react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// import MUI inputs
import { UserInputs } from "../components/UserInputs";

// custom hook for async fetching data
import useRequest from "../components/useRequest";

// config for candlestick chart
import { series, options } from "../utils/config";

// url for api
import { urlString, titleToSlug, slugToTitle } from "../utils/utils";

// available routes from api
import { slugs } from "../utils/constants";

// dynamically load component with no SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// TO-DO LIST
// fix date picker
// add oscillators chart in ternary operator
// put input states into local storage for persistance

const IndicatorPage = () => {
  const router = useRouter();

  // define input states
  const [ticker, setTicker] = useState("MSFT");
  const [start, setStart] = useState("2021-01-01");
  const [indicator, setIndicator] = useState("Supertrend");

  // define fetch url
  const [url, setUrl] = useState(
    urlString(titleToSlug(indicator), ticker, start)
  );

  // load fetch data using custom hook
  let { data, loading, error } = useRequest(url);

  // change app url to /chosen-indicator
  useEffect(() => {
    const slug = titleToSlug(indicator);
    router.push(`/${slug}`, undefined, { shallow: true });
  }, [url]);

  const handleClick = () => {
    setUrl(urlString(titleToSlug(indicator), ticker, start));
  };

  return (
    <>
      {loading && <h1>Data is loading...</h1>}

      {error && <h1>Failed to fetch - {error}</h1>}

      {data &&
        (data.info.type === "overlay" ? (
          <ReactApexChart
            options={options(ticker, slugToTitle(data.info.name))}
            series={series(data)}
            type="candlestick"
          />
        ) : (
          <h1>oscillators in beta</h1>
        ))}

      <UserInputs
        setTicker={setTicker}
        setStart={setStart}
        setIndicator={setIndicator}
        start={start}
        onClick={handleClick}
      />
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
