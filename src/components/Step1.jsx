import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateStep1 } from '../actions';

const Step1 = ({ selectedOption, shelter, donationAmount, updateStep1, handleNext }) => {
  const options = ['Konkrétny útulok', 'Prispiť nadácii'];
  const amounts = [5, 10, 20, 50, 100];
  const [customAmount, setCustomAmount] = useState('');

  const [shelters, setShelters] = useState([]);
  
  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const response = await fetch('https://frontend-assignment-api.goodrequest.dev/api/v1/shelters');
        const data = await response.json();
        // console.log(data.shelters);
        setShelters(data.shelters);
      } catch (error) {
        console.error('Error fetching shelters:', error);
      }
    };

    fetchShelters();
  }, []);


  const handleAmountChange = (e) => {
    const amount = e.target.value; 

    updateStep1('selectedOption', amount);
    setCustomAmount(''); 
  };

  const handleCustomAmountChange = (e) => {
    const amount = e.target.value;
    setCustomAmount(amount);
    updateStep1('selectedOption', amount);
  };

  const handleAmountOptionChange = (e) => {
    const amount = e.target.value;
    if (amount === 'Iná suma') {
      setCustomAmount('');
    }
    updateStep1('selectedOption', amount);
  };

  return (
    <div>
      <h2>Krok 1: Vyberte možnosť</h2>
      {options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            name="selectedOption"
            value={option}
            checked={selectedOption === option }
            onChange={(e) => updateStep1('selectedOption', e.target.value)}
          />
          {option}
        </label>
      ))}
      <br />
      {(selectedOption === 'Konkrétny útulok' || selectedOption === '') && (
        <div>
  
          <label>
            Vyberte útulok:
            <select
              name="shelter"
              onChange={(e) => updateStep1('shelter',e.target.value)}
            >
              <option value="">-- Vyberte útulok --</option>
              {shelters.map((shelter) => (
                <option key={shelter.id} value={shelter.name}>
                  {shelter.name}
                </option>
              ))}
            </select>
          </label>
          <br />
        </div>
      )}
      <label>
        Vyberte sumu:
        <br />
        {amounts.map((amount) => (
          <label key={amount}>
            <input
              type="radio"
              name="donationAmount"
              value={amount}
              checked={donationAmount == amount }
              onChange={handleAmountChange}
            />
            {amount}
          </label>
        ))}
        <br />
        <label>
          <input
            type="radio"
            name="donationAmount"
            value="Iná suma"
            checked={donationAmount === customAmount}
            onChange={handleAmountOptionChange}
          />
          Iná suma:
          <input
            type="number"
            name="customAmount"
            value={customAmount}
            onChange={handleCustomAmountChange}
            
          />
        </label>
      </label>
      <br />
       
      <button onClick={handleNext}>Pokračujte</button>
    </div>
  );
};

const mapStateToProps = (state) => ({ 
  selectedOption: state.step1.selectedOption,
  shelters: state.step1.shelters,
  donationAmount: state.step1.donationAmount
});

const mapDispatchToProps = {
  updateStep1,
};

export default connect(mapStateToProps, mapDispatchToProps)(Step1);