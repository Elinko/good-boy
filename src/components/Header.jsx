import React from "react"; 

const Header = () => { 

  return (
    <header id="header" className="header">
      <div className='container'>
        <div className="d-flex justify-content-between align-items-center">
          <a href="/" className="logo">Nadácia Good Boy</a>
          <div className="social">
            <a href=""><img src="images/facbook.png" alt="facebook" /></a>
            <a href=""><img src="images/ig.png" alt="Instagram" /></a>
          </div>
        </div>
      </div>
    </header> 
  );
};

export default Header;
