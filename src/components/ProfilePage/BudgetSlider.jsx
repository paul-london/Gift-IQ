function BudgetSlider({ value = 1500, onChange }) {
  const handleChange = (e) => {
    if (onChange) {
      onChange(Number(e.target.value));
    }
  };

  return (
    <div className="budget">
      <h3>Current Budget</h3>

      <input
        type="range"
        min="0"
        max="500"
        value={value}
        onChange={handleChange}
        className="budget-slider"
      />

      <span className="budget-value">${value}</span>
    </div>
  );
}

export default BudgetSlider;
