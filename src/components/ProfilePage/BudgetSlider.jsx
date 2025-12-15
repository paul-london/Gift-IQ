import "../ProfilePage/BudgetSlider.css";

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
        className="budget-slider"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min="0"
        max="1000"
      />
    </div>
  );
}

export default BudgetSlider;
