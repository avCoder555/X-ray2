import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ label, value }) => {
return (
	<div >
	{/* {label}{" "}
	<div className="toggle-switch">
		<input type="checkbox" className="checkbox"
			name={label} id={label} />
		<label className="label" htmlFor={label}>
		<span className="inner" />
		<span className="switch" />
		</label>
	</div> */}
	<div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"
  />
</div>
	</div>
);
};

export default ToggleSwitch;
