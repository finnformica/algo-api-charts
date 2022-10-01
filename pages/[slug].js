import React from "react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// import MUI inputs
import { UserInputs } from "../components/UserInputs";

// import MUI circular loader
import CircularProgress from "@mui/material/CircularProgress";

// custom hook for async fetching data
import useRequest from "../components/useRequest";

// config for candlestick chart
import { seriesOverlay, optionsOverlay } from "../utils/configOverlay";

// url for api
import { urlString, titleToSlug, slugToTitle } from "../utils/utils";

// available routes from api
import { slugs } from "../utils/constants";

// dynamically load component with no SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// TO-DO LIST
// add oscillators chart in ternary operator

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

    localStorage.setItem("info", JSON.stringify({ start, indicator, ticker }));
  };

  return (
    <>
      {loading && (
        <div
          style={{
            textAlign: "center",
            paddingTop: "10rem",
            fontFamily: "sans-serif",
          }}
        >
          <CircularProgress pb={4} />
          <h1>Data is loading...</h1>
        </div>
      )}

      {error && <h1>Failed to fetch - {error}</h1>}

      {data && (
        <>
          {data.info.type === "overlay" ? (
            <ReactApexChart
              options={optionsOverlay(ticker, slugToTitle(data.info.name))}
              series={seriesOverlay(data)}
              type="candlestick"
            />
          ) : (
            <>
              <ReactApexChart
                options={options(ticker, slugToTitle(data.info.name))}
                series={series(data)}
                type="candlestick"
              />
              <ReactApexChart />
            </>
          )}
          <UserInputs
            setTicker={setTicker}
            setStart={setStart}
            setIndicator={setIndicator}
            start={start}
            ticker={ticker}
            indicator={indicator}
            onClick={handleClick}
          />
        </>
      )}
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
