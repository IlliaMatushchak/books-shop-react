function calculateMinAndMaxPrice(products = []) {
  if (!products.length) return [0, Infinity];

  return products.reduce(
    ([min, max], { price = 0 }) => [Math.min(min, price), Math.max(max, price)],
    [Infinity, -Infinity],
  );
}

function getAllUniqueTags(products = []) {
  let uniqueTags = new Set();
  for (const product of products) {
    for (const tag of product.tags ?? []) {
      uniqueTags.add(tag);
    }
  }
  return [...uniqueTags];
}

export { calculateMinAndMaxPrice, getAllUniqueTags };
