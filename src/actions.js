// export const updateStep1 = (selectedOption, donationAmount, shelter) => ({
//   type: 'UPDATE_STEP1',
//   payload: { selectedOption, donationAmount, shelter },
// });

export const updateStep1 = (name, value) => ({
  type: 'UPDATE_STEP1',
  payload: { name, value },
});

export const updateStep2 = (name, value) => ({
  type: 'UPDATE_STEP2',
  payload: { name, value },
});

export const updateCurrentStep = (step) => ({
  type: 'UPDATE_CURRENT_STEP',
  payload: step,
});
 

export const toggleAgreement = () => ({ type: 'TOGGLE_AGREEMENT' });