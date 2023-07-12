import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateStep1 } from '../actions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
    <div>
      <h1>Vyberte si možnosť, ako chcete pomôcť</h1>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, setFieldValue, values }) => (
          <Form>
            <div>
              <label>Možnosť:</label>
              <div>
                <label>
                  <Field type="radio" name="option" value="Konkrétny útulok" />
                  Konkrétny útulok
                </label>
                <label>
                  <Field type="radio" name="option" value="Prispieť nadácii" />
                  Prispieť nadácii
                </label>
              </div>
              <ErrorMessage name="option" component="div" className="error" />
            </div>
            <div>
              <Field name="shelterID">
                {({ field, form }) => (
                  <>
                    {form.values.option === 'Konkrétny útulok' && (
                      <div>
                        <label htmlFor="shelterID">Útulok:</label>
                        <Field as="select" id="shelterID" name="shelterID">
                          <option value="">-- Vyberte útulok --</option>
                          {shelters.map((shelter) => (
                            <option key={shelter.id} value={shelter.id}>
                              {shelter.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="shelterID" component="div" className="error" />
                      </div>
                    )}
                  </>
                )}
              </Field>
            </div>
            <div>
              <label>Vyberte sumu:</label>
              <br />
              {amounts.map((amount) => (
                <label key={amount}>
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
                  {amount}
                </label>
              ))}
              <br />
              <label>
                <Field
                  type="radio"
                  name="donationAmount"
                  value="Iná suma"
                  checked={values.donationAmount === values.customAmount}
                  onChange={() => setFieldValue('donationAmount', 'Iná suma')}
                />
                Iná suma:
                <Field
                  type="number"
                  name="customAmount"
                  onChange={(e) => {
                    setFieldValue('donationAmount', e.target.value);
                    setFieldValue('customAmount', e.target.value);
                  }}
                />
              </label>
            </div>

            <button type="submit">Odoslať</button>
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