export const zipTimeseries = (a, b) =>
  a.map((k, i) => ({ x: new Date(k), y: b[i].toFixed(2) }));

export const zipOHLC = (dates, open, high, low, close) =>
  dates.map((date, i) => ({
    x: new Date(date),
    y: [
      open[i].toFixed(2),
      high[i].toFixed(2),
      low[i].toFixed(2),
      close[i].toFixed(2),
    ],
  }));

export function slugToTitle(slug) {
  var words = slug.split("-");

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(" ");
}

export function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export const urlString = (slug, ticker, start) =>
  `https://algo-api-app.herokuapp.com/${slug}?ticker=${ticker}&start=${start}`;

export default { urlString, slugToTitle, zipOHLC, zipTimeseries };
