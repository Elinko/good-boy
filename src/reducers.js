const initialState = {
    step1: {
      selectedOption: 'Konkrétny útulok',
      donationAmount: 50,
      shelters: [],
      shelterID: '',
    },
    step2: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '+421',
    },
    agreedToTerms: false,
    currentStep: 1, // Pridaná položka pre currentStep
  };
  
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_STEP1':
        return {
          ...state,
          step1: {
            ...state.step1,
            [action.payload.name]: action.payload.value,
          }, 
        };
        // return {
        //   ...state,
        //   step1: {
        //     selectedOption: action.payload.selectedOption,
        //     donationAmount: action.payload.donationAmount,
        //   },
        //   shelter: action.payload.shelter,
        // };
      case 'UPDATE_STEP2':
        return {
          ...state,
          step2: {
            ...state.step2,
            [action.payload.name]: action.payload.value,
          },
        };
      case 'TOGGLE_AGREEMENT':
        return {
          ...state,
          agreedToTerms: !state.agreedToTerms,
        };
      case 'UPDATE_CURRENT_STEP':
        return {
          ...state,
          currentStep: action.payload,
        };
        default:
        return state;
    }
  };
  
  export default formReducer;