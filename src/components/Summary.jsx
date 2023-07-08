import React from 'react';
import { connect } from 'react-redux';
import { toggleAgreement } from '../actions';

const Summary = ({ selectedOption, donationAmount, shelters, firstName, lastName, email, phone, agreedToTerms, toggleAgreement, handlePrev }) => {
  const handleCheckboxChange = () => {
    toggleAgreement();
  };

  return (
    <div>
      <h2>Rekapitulácia</h2>
      <p>Vybraná možnosť: {selectedOption}</p>
      <p>Najviac mi záleží na útulku: {shelters}</p>
      <p>Suma: {donationAmount}</p>
      <p>Meno: {firstName}</p>
      <p>Priezvisko: {lastName}</p>
      <p>Email: {email}</p>
      <p>Telefón: {phone}</p>
      <label>
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={handleCheckboxChange}
        />
        Súhlasím s podmienkami
      </label>
      <br />
      <button>Potvrdiť</button>
      <button onClick={handlePrev}>Späť</button>

    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedOption: state.step1.selectedOption,
  shelters: state.step1.shelter,
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