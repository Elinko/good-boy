import React from 'react';
import { Provider, connect } from 'react-redux';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Donation from "./components/Donation";
import store from './store';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Summary from './components/Summary';
import { updateCurrentStep } from './actions';

import './App.scss';
import styles from './scss/styles.scss';

const Steps = ({ currentStep, updateCurrentStep }) => {

  const handleNext = () => {
    updateCurrentStep(currentStep + 1);
    console.log(currentStep);
  };

  const jumpToStep1 = () => {
    updateCurrentStep(1);
    console.log(currentStep);
  };

  const handlePrev = () => {
    updateCurrentStep(currentStep - 1);
  };



  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 handleNext={handleNext} />;
      case 2:
        return <Step2 handleNext={handleNext} handlePrev={handlePrev} />;
      case 3:
        return <Summary jumpToStep1={jumpToStep1}  handlePrev={handlePrev} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className='step'>
        <span className={`step__item ${currentStep === 1 ? 'step__item--active' : ''}`} />
        <span className={`step__item ${currentStep === 2 ? 'step__item--active' : ''}`} />
        <span className={`step__item ${currentStep === 3 ? 'step__item--active' : ''}`} />
      </div>
      {renderStep()}
     </div>
  );
};

const mapStateToProps = (state) => ({
  currentStep: state.currentStep,
});

const mapDispatchToProps = {
  updateCurrentStep,
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(Steps);

const displayModal= () => {
  let modal = document.getElementById('modal-wrap')
  modal.style.display = 'none';
}

 

  
function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className="container">
        <div className="main">
          <div className="row">
            <div className="col-lg-7 form">
 
              <Provider store={store}> 
                  <ConnectedApp /> 
              </Provider>
            </div>
            <div className="col-lg-5 d-none d-lg-block">
              <img src="images/dog.png" alt="dog" />
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <div className='modal-wrap' id="modal-wrap" onClick={displayModal} >
        <div className='modal-success'>
          <h2>
            Ďakujeme, formuál úspešne odoslaný
          </h2>
          <span className='close'>x</span>
        </div>
      </div>
    </div>
  );
}

 
export default App;