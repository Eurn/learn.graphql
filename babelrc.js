module.exports = (api) => {
  api.cache(true);

  const persets = [["@babel/preset-env", { targets: { node: true } }]];

  return { persets };
};
