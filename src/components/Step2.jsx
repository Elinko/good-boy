import React from 'react';
import { connect } from 'react-redux';
import { updateStep2 } from '../actions';

const Step2 = ({ firstName, lastName, email, phone, updateStep2, handleNext, handlePrev }) => {
  return (
    <div>
      <h2>Krok 2: Zadajte vaše údaje</h2>
      <label>
        Meno:
        <input
          type="text"
          name="firstName"
          value={firstName}
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
          onChange={(e) => updateStep2(e.target.name, e.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => updateStep2(e.target.name, e.target.value)}
        />
      </label>
      <br />
      <label>
        Telefón:
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => updateStep2(e.target.name, e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleNext}>Pokračovať</button>
      <button onClick={handlePrev}>Späť</button>
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