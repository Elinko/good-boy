import React, { useEffect } from 'react';
import { connect } from 'react-redux'; 
import axios from 'axios';
import {  resetForm, updateStep1, updateStep2, toggleAgreement } from '../actions';  
import { Formik, Form, Field, useFormikContext   } from 'formik'; 

import * as Yup from 'yup';
import CheckboxGroup from "./checkbox/CheckBox";


const Summary = ({ selectedOption, donationAmount, shelters, shelterID, firstName, lastName, email, phone, agreedToTerms, handlePrev, jumpToStep1 }) => {

  const initialFormValues = {
    agreedToTerms: agreedToTerms
  }; 
 
 
  const handleFormSend = (values, actions) => {
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
            // values.resetForm();
            // updateStep1('selectedOption', 'Konkrétny útulok');
            // updateStep1('shelterID', '');
            // updateStep1('donationAmount', '');
            // updateStep1('customAmount', '');

            // updateStep2('firstName', '');
            // updateStep2('lastName','');
            // updateStep2('email', '');
            // updateStep2('phone', ''); 
             
            actions.resetForm();
            console.log(response)

            resetForm();

            document.getElementById('modal-wrap').style.display = 'block';


            // jumpToStep1()
             

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
    <div className='step3'>
      <h1>Skontrolujte si zadané údaje</h1>
      <p>
        <strong>Akou formou chcem pomôcť</strong> 
        <span>{selectedOption == 'Prispieť nadácii' ? 'Chcem finančne prispieť celej nadácii' : 'Chcem finančne prispieť konkrétnemu útulku' }</span>      
      </p>  
 
      {shelterID != null && <p> <strong>Najviac mi záleží na útulku</strong> <span>{shelters[shelterID].name}</span></p>}

      <p>
        <strong>Suma ktorou chcem pomôcť</strong>
        <span>{donationAmount}&nbsp;€</span>  
      </p>
      <p>
        <strong>Meno a priezvisko</strong>
        <span>{firstName} {lastName}</span>
      </p> 
      <p>
        <strong>E-mailová adresa</strong>
        <span>{email}</span>
      </p>
      <p>
        <strong>Telefónne číslo</strong>
        <span>{phone}</span>
      </p> 

      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSend}
      >
        <Form>

        <Field
          name='agreedToTerms'
          component={CheckboxGroup}
          options={['Súhlasím so spracovaním mojich osobných údajov']}
          label="Súhlasím so spracovaním mojich osobných údajov"
        /> 

          <div className='d-flex justify-content-between'>
            <button type="button" onClick={handlePrev} className='btn btn__light'>
              Späť
            </button>
            <button type="submit" className='btn btn__gray'>
              Pokračovať
            </button>
          </div>
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
  resetForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);