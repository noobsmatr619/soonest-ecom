import React from 'react'
import  SimpleSlider   from './Slider';
import Product from "./Product";

 import './Home.css'
function Home() {
    return (
        <div className="home">
              <div className="homeCont">
                  <SimpleSlider/>
         
                  <div className="homeRow"><Product name='The right pet' cost={6.40} stars={5} image="/Image/test.png"/> <Product name='The right pet' cost={6.40} stars={5} image="/Image/test.png"/></div>             
                  <div className="homeRow"><Product name='The right pet' cost={6.40} stars={5} image="/Image/test.png"/><Product name='The right pet' cost={6.40} stars={5} image="/Image/test.png"/><Product name='The right pet' cost={6.40} stars={5} image="/Image/test.png"/><Product name='The right pet' cost={6.40} stars={5} image="/Image/test.png"/></div>             
                  <div className="homeRow"><Product name='The right pet' cost={6.40} stars={5} image="/Image/test.png"/></div>             
               
               </div> 
               
        </div>
    )
}

export default Home
