function BudgetSlider({ value = 1500, onChange }) {
  const handleChange = (e) => {
    if (onChange) {
      onChange(Number(e.target.value));
    }
  };

  return (
    <div className="budget">
      <div className="budget-top-row">
        <h3>Current Budget</h3>
        <span className="budget-value">${value}</span>
      </div>

      <input
        type="range"
        min="0"
        max="500"
        value={value}
        onChange={handleChange}
        className="budget-slider"
      />
    </div>
  );
}

export default BudgetSlider;
