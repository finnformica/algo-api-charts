import { zipOHLC, zipTimeseries } from "./utils";

export const optionsOscillator = (ticker, title) => ({
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

export default { seriesOscillator, optionsOscillator };
