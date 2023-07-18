import React from "react";

const Footer = () => {
  return (
    <footer id="footer" className="footer text-left">

       <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6 ">
                    <div className="footer__item">
                        <img src="images/logo-new.png" alt="Good boy logo" />
                    </div>
                </div>
                <div className="col-lg-3 col-md-6  ">
                    <div className="footer__item">
                        <h3>Nadácia Good boy</h3>
                        <ul>
                            <li>
                                <a href="">O projekte</a>
                            </li>
                            <li>
                                <a href="">Ako na to</a>
                            </li>
                            <li>
                                <a href="">Kontakt</a>
                            </li>

                        </ul>
                        
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="footer__item">
                        <h3>Nadácia Good boy</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in interdum ipsum, sit amet. </p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="footer__item">
                        <h3>Nadácia Good boy</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in interdum ipsum, sit amet. </p>
                    </div>
                </div>
                
            </div> 
       </div>
    </footer>
  );
};

export default Footer;
