const config = ({ price, signals, ticker }) => {
  return {
    series: [
      {
        name: "Upper Bollinger Band",
        type: "line",
        data: signals.upperBB,
      },
      {
        name: "Lower Bollinger Band",
        type: "line",
        data: signals.lowerBB,
      },
      {
        name: ticker + " Price",
        type: "candlestick",
        data: price,
      },
    ],
    options: {
      chart: {
        type: "candlestick",
        height: 350,
      },
      title: {
        text: "CandleStick Chart",
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  };
};

export default config;
