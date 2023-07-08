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
import './scss/styles.scss';

const Steps = ({ currentStep, updateCurrentStep }) => {

  const handleNext = () => {
    updateCurrentStep(currentStep + 1);
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
        return <Summary  handlePrev={handlePrev} />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
};

const mapStateToProps = (state) => ({
  currentStep: state.currentStep,
});

const mapDispatchToProps = {
  updateCurrentStep,
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(Steps);

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className="container">
        <div className="main">
          <div className="row">
            <div className="col-md-7">
              <Provider store={store}>
                <ConnectedApp />
              </Provider>
            </div>
            <div className="col-md-5">
              <img src="images/dog.png" alt="dog" />
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;