import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateStep1 } from '../actions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { ReactComponent as WalletIcon } from '../img/wallet.svg';
import { ReactComponent as PawIcon } from '../img/paw.svg';


const Step1 = ({ selectedOption, shelters, shelterID, donationAmount, customAmount, updateStep1, handleNext }) => {
  const amounts = [5, 10, 20, 50, 100];

  const initialFormValues = {
    option: selectedOption || 'Konkrétny útulok',
    shelterID: shelterID || '',
    donationAmount: donationAmount || '',
    customAmount: customAmount || '',
  };

  // useEffect(() => {
  //   setInitialFormValues({
  //     option: selectedOption,
  //     shelterID: shelterID,
  //     donationAmount: donationAmount,
  //     customAmount: customAmount,
  //   });
  // }, [selectedOption, shelterID, donationAmount, customAmount]);

  const validationSchema = Yup.object().shape({
    option: Yup.string().required('Typ dotácie je povinný'),
    shelterID: Yup.string().when('option', {
      is: (option) => option === 'Konkrétny útulok',
      then: Yup.string().required('Vyberte útulok'),
    }),
    donationAmount: Yup.number().required('Zadajte sumu'),
  });

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const response = await fetch('https://frontend-assignment-api.goodrequest.dev/api/v1/shelters');
        const data = await response.json();
        updateStep1('shelters', data.shelters);
      } catch (error) {
        console.error('Error fetching shelters:', error);
      }
    };

    fetchShelters();
  }, []);

  const handleSubmit = (values) => {
    if (values.option === 'Prispieť nadácii') {
      values.shelterID = null;
    }
    updateStep1('selectedOption', values.option);
    updateStep1('shelterID', values.shelterID);
    updateStep1('donationAmount', values.donationAmount);
    updateStep1('customAmount', values.customAmount);
    console.log(values);
    handleNext();
  };

  return (
    <div className='step1'>
      <h1>Vyberte si možnosť, ako chcete pomôcť</h1>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, setFieldValue, values }) => (
          <Form>
            <div> 
              <div className='d-flex step1__shelter-type-wrap'>
                <label className={`step1__shelter-type step1__shelter-type--left ${values.option === 'Konkrétny útulok' ? 'active' : ''}`}>
                  <span><WalletIcon /></span>
                  <Field type="radio" name="option" value="Konkrétny útulok" />
                  <p>Chcem finančne prispieť konkrétnemu útulku</p>
                </label>
                <label className={`step1__shelter-type step1__shelter-type--right ${values.option === 'Prispieť nadácii' ? 'active' : ''}`}>
                  <span><PawIcon /></span>
                  <Field type="radio" name="option" value="Prispieť nadácii" />
                  <p>Chcem finančne prispieť celej&nbsp;nadácii</p>
                </label>
              </div>
              <ErrorMessage name="option" component="div" className="error" />
            </div>
            <div>
              <Field name="shelterID">
                {({ field, form }) => (
                  <>
                    {form.values.option === 'Konkrétny útulok' && (
                      <>
                        <div className='d-flex justify-content-between field-info'><strong>O projekte</strong> <span>Nepovinné</span></div>
                        <div className='form-control'>
                          <label htmlFor="shelterID">Útulok</label>
                          <Field as="select" id="shelterID" name="shelterID">
                            <option value="">Vyberte útulok zo zoznamu</option>
                            {shelters.map((shelter) => (
                              <option key={shelter.id} value={shelter.id}>
                                {shelter.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage name="shelterID" component="div" className="error" />
                        </div>
                      </>
                    )}
                  </>
                )}
              </Field>
            </div>
            <div> 
              <div className='d-flex justify-content-between field-info'><strong>Suma, ktorou chcem prispieť</strong> </div>
              <div className='d-flex'>
                {amounts.map((amount) => (
                  <label key={amount} className={`radio-btn ${values.donationAmount === amount ? 'active' : ''}`}>
                    <Field
                      type="radio"
                      name="donationAmount"
                      value={amount}
                      checked={values.donationAmount === amount}
                      onChange={() => {
                        setFieldValue('customAmount', '');
                        setFieldValue('donationAmount', amount);
                      }}
                    />
                    {amount}&nbsp;€
                  </label>
                ))}

                <label className={`radio-btn radio-btn--long ${values.donationAmount === values.customAmount ? 'active' : ''}`}>
                  <Field 
                    type="radio"
                    name="donationAmount"
                    value="Iná suma"
                    checked={values.donationAmount === values.customAmount}
                    onChange={() => setFieldValue('donationAmount', 'Iná suma')}
                  />
                  <div>

                    <Field
                      type="number"
                      name="customAmount"
                      onChange={(e) => {
                        setFieldValue('donationAmount', e.target.value);
                        setFieldValue('customAmount', e.target.value);
                      }}
                    />&nbsp;€
                  </div>
                </label>
              </div>
            </div>

            <div className='text-right'>
            <button type="submit" className='btn btn__brown'>Pokračovať</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => ({ 
  selectedOption: state.step1.selectedOption,
  shelters: state.step1.shelters,
  shelterID: state.step1.shelterID,
  donationAmount: state.step1.donationAmount,
  customAmount: state.step1.customAmount
});

const mapDispatchToProps = {
  updateStep1,
};

export default connect(mapStateToProps, mapDispatchToProps)(Step1);