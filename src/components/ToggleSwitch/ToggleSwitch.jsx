import "../ToggleSwitch/ToggleSwitch.css";
import React, { useState } from "react";

function ToggleSwitch({ className }) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <label className="toggle-switch">
      <input type="checkbox" className="toggle-switch__checkbox" />
      <span className="toggle-switch__circle"></span>
      <span className="toggle-switch__text toggle-switch__text_F">F</span>
      <span className="toggle-switch__text toggle-switch__text_C">C</span>
    </label>
  );
}

export default ToggleSwitch;
