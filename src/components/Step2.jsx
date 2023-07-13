import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateStep2 } from '../actions';
import PhoneInput , { isValidPhoneNumber } from 'react-phone-number-input';
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
    <div className='step2'>
      <h1>Potrebujeme od Vás zopár informácií</h1>
      <Formik
        initialValues={initialFormValues} 
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div>
                <div className='d-flex justify-content-between field-info'><strong>O vás</strong>  </div>
                <div className='form-control'>
                  <label>
                    Meno:
                    <Field type="text" name="firstName" placeholder="Zadajte Vaše meno" />
                    <ErrorMessage name="firstName" component="div" />
                  </label>  
                </div>  
                <div className='form-control'>
                  <label>
                    Priezvisko:
                    <Field type="text" name="lastName" />
                  </label>
                </div> 
                    <ErrorMessage name="lastName" component="div" className="error" />
                <div className='form-control'>
                  <label>
                    Email:
                    <Field type="email" name="email" />
                  </label>
                </div> 
                    <ErrorMessage name="email" component="div"  className="error"/>
                <div className='form-control'>
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
                </div> 
                <div className='d-flex justify-content-between'>
                  <button type="button" onClick={handlePrev} className='btn btn__light'>
                    Späť
                  </button>
                  <button type="submit" disabled={isSubmitting} className='btn btn__gray'>
                    Pokračovať
                  </button>
                </div>
                 
            </div>

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