import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateStep2 } from '../actions';
import PhoneInput , { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import 'react-phone-number-input/style.css'; 
import * as Yup from 'yup';
 


const Step2 = ({ firstName, lastName, email, phone, updateStep2, handleNext, handlePrev }) => {

  const [phoneVal, setPhoneVal] = useState(phone);

  const initialFormValues = {
    firstName: firstName || ' ',
    lastName: lastName || '',
    email: email || '', 
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().max(20),
    lastName: Yup.string().required('Prosím zadajte priezvisko'),
    email: Yup.string().email('Prosím zadajte email v správnom tvare').required('Prosím zadajte email'),
    
  });
  
  const handleSubmit = (values, { setSubmitting }) => {
    console.log('submitujem', values);
    updateStep2('firstName', values.firstName);
    updateStep2('lastName', values.lastName);
    updateStep2('email', values.email);
    updateStep2('phone', phoneVal);
    
    handleNext();
    setSubmitting(false);
  };
 


  return (
    <div>
      <h2>Krok 2: Zadajte vaše údaje</h2>
      <Formik
        initialValues={initialFormValues} 
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <label>
              Meno:
              <Field type="text" name="firstName" />
              <ErrorMessage name="firstName" component="div" />
            </label>
            <br />
            <label>
              Priezvisko:
              <Field type="text" name="lastName" />
              <ErrorMessage name="lastName" component="div" />
            </label>
            <br />
            <label>
              Email:
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </label>
            <br />
            <label>
              Telefón:
              <Field name="phone">
                {({ field }) => (
                  <PhoneInput 
                    className="phoneInput"
                    countries={['SK', 'CZ']}
                    defaultCountry="SK"
                    placeholder="Enter phone number"
                    value={phoneVal}
                    countryCallingCodeEditable={false}
                    onChange={setPhoneVal }
                    error={phoneVal ? (isValidPhoneNumber(phoneVal) ? undefined : 'Invalid phone number') : 'Phone number required'}
                    name="phone"
                    required 
                    maxLength={16}
                    pattern="^(\+421|\\+420)?(\s?\d{3}){3}$"
                    international 
                  />
                )}
              </Field>
              <ErrorMessage name="phone" component="div" />
            </label>
            <br />
            <button type="submit" disabled={isSubmitting}>
              Pokračovať
            </button>
            <button type="button" onClick={handlePrev}>
              Späť
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => ({
  firstName: state.step2.firstName,
  lastName: state.step2.lastName,
  email: state.step2.email,
  phone: state.step2.phone,
});

const mapDispatchToProps = {
  updateStep2,
};

export default connect(mapStateToProps, mapDispatchToProps)(Step2);