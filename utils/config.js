const zipTimeseries = (a, b) =>
  a.map((k, i) => ({ x: new Date(k), y: b[i].toFixed(2) }));

const zipOHLC = (dates, open, high, low, close) =>
  dates.map((date, i) => ({
    x: new Date(date),
    y: [
      open[i].toFixed(2),
      high[i].toFixed(2),
      low[i].toFixed(2),
      close[i].toFixed(2),
    ],
  }));

function makeTitle(slug) {
  var words = slug.split("-");

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(" ");
}

export const options = (slug) => ({
  chart: {
    type: "candlestick",
    height: 350,
  },
  title: {
    text: makeTitle(slug),
    align: "left",
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

// export const series1 = ({
//   price: { open, high, low, close },
//   signals,
//   info: { ticker },
// }) => [
//   {
//     name: "Upper Bollinger Band",
//     type: "line",
//     data: zipTimeseries(
//       Object.keys(signals.upper_bb),
//       Object.values(signals.upper_bb)
//     ),
//   },
//   {
//     name: "Lower Bollinger Band",
//     type: "line",
//     data: zipTimeseries(
//       Object.keys(signals.lower_bb),
//       Object.values(signals.lower_bb)
//     ),
//   },
//   {
//     name: ticker + " Price",
//     type: "candlestick",
//     data: zipOHLC(
//       Object.keys(open),
//       Object.values(open),
//       Object.values(high),
//       Object.values(low),
//       Object.values(close)
//     ),
//   },
// ];

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

export default { series, options };