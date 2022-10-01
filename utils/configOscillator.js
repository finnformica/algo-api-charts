import { zipOHLC, zipTimeseries } from "./utils";

// make chart height smaller
export const optionsOscillator = () => ({
  chart: {
    type: "line",
    height: 10,
  },
  xaxis: {
    type: "datetime",
    tooltip: {
      enabled: true,
    },
  },
  yaxis: {
    tooltip: {
      enabled: false,
    },
  },
  tooltip: {
    shared: false,
  },
});

export const options = (ticker, title) => ({
  chart: {
    type: "candlestick",
    height: 350,
  },
  title: {
    text: `${ticker} - ${title}`,
    align: "center",
    style: {
      fontSize: "28px",
    },
  },
  xaxis: {
    type: "datetime",
    tooltip: {
      enabled: true,
    },
  },
  yaxis: {
    tooltip: {
      enabled: false,
    },
  },
  tooltip: {
    shared: false,
  },
});

export const seriesOscillator = ({
  price: { open, high, low, close },
  signals,
  info: { ticker },
}) => {
  const mapped = Object.keys(signals).map((signal) => ({
    name: signal,
    type: "line",
    data: zipTimeseries(
      Object.keys(signals[signal]),
      Object.values(signals[signal])
    ),
  }));

  return mapped;
};

// remove signal data from function
export const series = ({
  price: { open, high, low, close },
  signals,
  info: { ticker },
}) => {
  const mapped = Object.keys(signals).map((signal) => ({
    name: signal,
    type: "line",
    data: zipTimeseries(
      Object.keys(signals[signal]),
      Object.values(signals[signal])
    ),
  }));
  mapped.push({
    name: ticker + " Price",
    type: "candlestick",
    data: zipOHLC(
      Object.keys(open),
      Object.values(open),
      Object.values(high),
      Object.values(low),
      Object.values(close)
    ),
  });

  return mapped;
};

export default { seriesOscillator, series, options, optionsOscillator };
