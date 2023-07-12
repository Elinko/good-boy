import React from 'react';
import { connect } from 'react-redux'; 
import axios from 'axios';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const Summary = ({ selectedOption, donationAmount, shelters, shelterID, firstName, lastName, email, phone, agreedToTerms, handlePrev }) => {
  
  const initialFormValues = {
    agreedToTerms: agreedToTerms
  };
   
  
  const handleFormSend = (values) => {
    if (values.agreedToTerms) {
      // console.log(values);
      axios
        .post('https://frontend-assignment-api.goodrequest.dev/api/v1/shelters/contribute', {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          value: donationAmount,
          shelterID: shelterID
        })
        .then((response) => { 
          if (response.status === 200) {
            // Reset form and show success modal
            values.resetForm();
            // setModalMessage('Formulár úspešne odoslaný.');
            // setModalVisible(true);
          }
        });
    }
  }; 
 

  const validationSchema = Yup.object({
    agreedToTerms: Yup.boolean().oneOf([true], 'Musíte súhlasiť s podmienkami')
  });

  return (
    <div>
      <h2>Rekapitulácia</h2>
      <p>Vybraná možnosť: {selectedOption}</p>
      <p> shelterID je {shelterID}</p>
      {shelterID != null && <p>Najviac mi záleží na útulku: {shelters[shelterID].name}</p>}

      <p>Suma: {donationAmount}</p>
      <p>Meno: {firstName}</p>
      <p>Priezvisko: {lastName}</p>
      <p>Email: {email}</p>
      <p>Telefón: {phone}</p>

      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSend}
      >
        <Form>
          <label>
            <Field type="checkbox" name="agreedToTerms" />
            Súhlasím s podmienkami
            <ErrorMessage name="agreedToTerms" component="div" className="error agreement-error" />
          </label>
          <br />
          <button type="submit">Potvrdiť</button>
          <button type="button" onClick={handlePrev}>
            Späť
          </button>
        </Form>
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedOption: state.step1.selectedOption,
  shelters: state.step1.shelters,
  shelterID: state.step1.shelterID,
  donationAmount: state.step1.donationAmount,
  firstName: state.step2.firstName,
  lastName: state.step2.lastName,
  email: state.step2.email,
  phone: state.step2.phone,
  agreedToTerms: state.agreedToTerms
});

const mapDispatchToProps = {
   
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);