import "./PriceRangeInput.css";

function PriceRangeInput({ priceRange, setPriceRange }) {
  const [minValue, maxValue] = priceRange;

  return (
    <fieldset className="price-range-fieldset">
      <legend>Price range</legend>
      <input
        title="from price"
        type="number"
        placeholder="0"
        step="1"
        min="0"
        value={minValue === 0 ? "" : minValue}
        onChange={(e) => {
          let newValue = Number(e.target.value);
          if (newValue >= 0 && !Number.isNaN(newValue)) {
            setPriceRange([newValue, maxValue]);
          }
        }}
      />

      {minValue <= maxValue && <span>{"=>"}</span>}
      {minValue > maxValue && <span>{"<="}</span>}

      <input
        title="to price"
        type="number"
        placeholder="0"
        step="1"
        min="0"
        value={maxValue === 0 ? "" : maxValue}
        onChange={(e) => {
          let newValue = Number(e.target.value);
          if (newValue >= 0 && !Number.isNaN(newValue)) {
            setPriceRange([minValue, newValue]);
          }
        }}
      />
    </fieldset>
  );
}

export default PriceRangeInput;
