import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateStep2 } from '../actions';
import PhoneInput , { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; 
 


const Step2 = ({ firstName, lastName, email, phone, updateStep2, handleNext, handlePrev }) => {
   

  const handlePhoneChange = (value) => { 
    updateStep2('phone', value); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitujem');
    let form = document.getElementById('form')
    form.classList.add('validated')
    if(form.checkValidity()) {
      handleNext()
    } else { 
      let phoneInput = document.querySelector('.PhoneInputInput:invalid')

      console.log(phoneInput);
      if(phoneInput != null) {  
        phoneInput.closest("label").querySelector('.error').style.display='block'
      } else {
        document.querySelector('.PhoneInputInput').closest("label").querySelector('.error').style.display='none'

      }
    }
  }

  return (
    <div>
      <h2>Krok 2: Zadajte vaše údaje</h2>
      
        <form id="form" onSubmit={handleSubmit} noValidate>
        
        <label>
          Meno:
          <input
            type="text"
            name="firstName"
            value={firstName}  
            minLength={2}
            maxLength={20}
            required={false}
            onChange={(e) => updateStep2(e.target.name, e.target.value)}
          />
        </label>
        <br />
        <label>
          Priezvisko:
          <input
            type="text"
            name="lastName"
            value={lastName}
            minLength={2}
            maxLength={20}
            required={true}
            onChange={(e) => updateStep2(e.target.name, e.target.value)}
          />
          <span className='error'>Prosím zadajte priezvisko</span>
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            value={email}
            onChange={(e) => updateStep2(e.target.name, e.target.value)}
          />
          <span className='error'>Prosím zadajte email v správnom tvare</span>
        </label>
        <br />
        <label>
          Telefón: 
          <PhoneInput 
            className="phoneInput"
            countries={['SK', 'CZ']}
            defaultCountry="SK"
            placeholder="Enter phone number"
            value={phone}
            countryCallingCodeEditable={false}
            onChange={handlePhoneChange}
            error={phone ? (isValidPhoneNumber(phone) ? undefined : 'Invalid phone number') : 'Phone number required'}
            name="phone"
            required 
            maxLength={16}
            pattern="^(\+421|\\+420)?(\s?\d{3}){3}$"
            international 
          />
          <span className='error'>Prosím zadajte telefón v správnom tvare</span>

        </label>
        <br />
        <button type='submit'>Pokračovať</button> 
        <button onClick={handlePrev}>Späť</button>
      </form>
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