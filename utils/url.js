export const urlString = (slug, ticker, start) =>
  `https://algo-api-app.herokuapp.com/${slug}?ticker=${ticker}&start=${start}`;

export default urlString;
