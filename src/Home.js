
import React from 'react'
import  SimpleSlider   from './Slider';
import Product from "./Product";

 import './Home.css'
function Home() {
    return (
        
        <div className="home">
           
              <div className="homeCont">
                  <SimpleSlider/>
           
                  <div className="homeRow"><Product id="1" name='The right pet' cost={10.40} stars={5} image="/Image/test.png"/> <Product id="4" name='The right pet' cost={6.40} stars={5} image="/Image/test.png"/></div>             
                  <div className="homeRow"><Product id="2" name='The right pet' cost={6.40} stars={5} image="/Image/test.png"/><Product id="5" name='The right pet' cost={6.40} stars={5} image="/Image/test.png"/><Product id="6" name='The right pet' cost={6.40} stars={5} image="/Image/test.png"/><Product id="7" name='The right pet' cost={6.40} stars={5} image="/Image/test.png"/></div>             
                  <div className="homeRow"><Product id="3" name='The right pet' cost={6.40} stars={5} image="/Image/test.png"/></div>             
               
               </div> 
               
        </div>
    )
}

export default Home