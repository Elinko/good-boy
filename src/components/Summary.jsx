import React from 'react';
import { connect } from 'react-redux';
import { toggleAgreement } from '../actions';
import axios from 'axios';


const Summary = ({ selectedOption, donationAmount, shelters, shelterID, firstName, lastName, email, phone, agreedToTerms, toggleAgreement, handlePrev }) => {
  const handleCheckboxChange = () => {
    let agreementError = document.querySelector('.agreement-error')
    {agreedToTerms== true ? agreementError.style.display = 'block' : agreementError.style.display = 'none'}
    toggleAgreement(); 

  };

  const handleFormSend = () => {
    let agreementError = document.querySelector('.agreement-error') 
    {agreedToTerms== false ? agreementError.style.display = 'block' : agreementError.style.display = 'none'}

    if(agreedToTerms) {
      // const requestData = {
      //   "firstName": firstName,
      //   "lastName":lastName,
      //   email,
      //   phone,
      //   donationAmount,
      //   shelter,
      // };
      // try {
      //   const response = axios.post('https://frontend-assignment-api.goodrequest.dev/api/v1/shelters/contribute');
      //   console.log('Response:', response.data); 
      // } catch (error) {
      //   console.error('Error:', error);
      // }

      axios.post("https://frontend-assignment-api.goodrequest.dev/api/v1/shelters/contribute", {
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'phone': phone,
        'value': donationAmount,
        'shelterID': shelterID
      })
      .then((response) => {
        console.log(response);
      });

 

    }
  }

  return (
    <div>
      <h2>Rekapitulácia</h2>
      <p>Vybraná možnosť: {selectedOption}</p>
      {shelterID != null && (<p>Najviac mi záleží na útulku: {shelters[shelterID].name}</p> )}
       
      <p>Suma: {donationAmount}</p>
      <p>Meno: {firstName}</p>
      <p>Priezvisko: {lastName}</p>
      <p>Email: {email}</p>
      <p>Telefón: {phone}</p>
      <label>
        <input
          type="checkbox"
          className='agreement'
          checked={agreedToTerms}
          onChange={handleCheckboxChange}
        />
        Súhlasím s podmienkami
        <span className='error agreement-error'>Musíte súhlasiť s podmienkami</span>
      </label>
      <br />
      <button onClick={handleFormSend}>Potvrdiť</button>
      <button onClick={handlePrev}>Späť</button>

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
  agreedToTerms: state.agreedToTerms,
});

const mapDispatchToProps = {
  toggleAgreement,
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);