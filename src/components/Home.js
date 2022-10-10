import React, { Component } from 'react';
import logo from '../pastedimage.png';

class Home extends Component {
    
      render(){
          return(
              <div>
                  <h2>Home</h2>
                  <img src={logo} alt="Logo" width="1000" height="700"  />
              </div>
          );
      }
}
export default Home;