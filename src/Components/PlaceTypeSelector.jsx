import React from 'react';
import Select, { components } from 'react-select';
import './PlaceTypeSelector.scss';

const SingleValueLabel = ({ children, data, ...props }) => {
  const Icon = data.icon;
  return (
    <components.SingleValue {...props}>
      <div className="single-value-container">
        <Icon />
        <span>{children}</span>
      </div>
    </components.SingleValue>
  );
};

const MultiValueLabel = ({ data, ...props }) => {
  const Icon = data.icon;
  return (
    <components.MultiValue {...props}>
      <div className="multi-value-container">
        <Icon className="multi-value-icon" />
        <span>{data.label}</span>
      </div>
    </components.MultiValue>
  );
};

const DropdownOption = ({ data, ...props }) => {
  const Icon = data.icon;
  return (
    <components.Option {...props}>
      <div className="dropdown-option">
        <Icon className="option-icon" />
        <span>{data.label}</span>
      </div>
    </components.Option>
  );
};

const PlaceTypeSelector = ({ options, onSelectionChange }) => {
  return (
    <div className="PlaceTypeSelector">
      <label className="selector-label">Place Types</label>
      <Select
        options={options}
        components={{ SingleValue: SingleValueLabel, MultiValue: MultiValueLabel, Option: DropdownOption }}
        onChange={onSelectionChange}
      />
    </div>
  );
};

export default React.memo(PlaceTypeSelector);
