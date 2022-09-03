import dynamic from "next/dynamic";

import state from "../data/SampleChartData.js";

// dynamically load component with no SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Home() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Algo API</h1>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="candlestick"
        height={450}
      />
    </div>
  );
}
