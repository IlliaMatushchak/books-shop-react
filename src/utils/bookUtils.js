function calculateMinAndMaxPrice(products = []) {
  if (!products.length) return [0, Infinity];

  return products.reduce(
    ([min, max], { price = 0 }) => [Math.min(min, price), Math.max(max, price)],
    [Infinity, -Infinity],
  );
}

export { calculateMinAndMaxPrice };
