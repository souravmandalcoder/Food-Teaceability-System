import React, { Component } from 'react';

class Logout extends Component {
    constructor() {
        super();
        localStorage.clear();
        
      }
      render(){
          return(
            window.location.href = "/"
           
            
          );
      }
}
export default Logout;