import React from 'react';
import { Checkbox } from 'antd';

// Input feedback
const InputFeedback = ({ error }) =>
  error ? <div className="input-feedback">{error}</div> : null;

const CheckboxField = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched,  setFieldTouched, setFieldValue },
  label,
  ...props
}) => {
    const handleChange = (event) => {
        const checked = event.target.checked;
        const agreedToTerms = checked ? true : false;
        setFieldValue(name, agreedToTerms);
    };
 

  return (
    <div className="form-group">
      <Checkbox
        {...props}
        name={name}
        checked={value}
        onChange={handleChange} 
      >
        {label}
      </Checkbox>
      <InputFeedback error={touched[name] && errors[name]} />
    </div>
  );
};

export default CheckboxField;
