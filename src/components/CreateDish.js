import QRCode from 'qrcode.react';
import React, { Component } from 'react';
import {QRGenerator} from 'dynamic-qr-code-generator';
//import QRCode from qrcode.react;

class GenerateQRC extends Component {
  
   
    renderOptions() {
      const { purchasedProducts } = this.props.purchasedProducts;
      //console.log(this.props.purchasedProducts)
      return (
        
        this.props.purchasedProducts.map((product) => {
          console.log(product.ownerName)
          console.log(localStorage.getItem('username'))
          if(product.ownerName==localStorage.getItem('username')){
          return <option>{product.name}</option>;
          }
        })
      );
  }
    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleChangeMultiple = (event) => {
      const { options } = event.target;
      const value1 = [];
      for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
          value1.push(options[i].value);
        }
      }
     
      
      this.setState({value: value1});
    };


    handleSubmit(event) {
      
      //const ingred=[];
      const p=this.state.value
      
      alert('QRCode is generated to Get goto QRcode Page');
     localStorage.setItem("ingredients",p)
     localStorage.setItem("dishname",this.dishName.value)
      event.preventDefault();
    }

      constructor(props) {
        super(props)
        
        this.state={
          count:0,
         
          value: 'coconut'
        }
        

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
      }
      render(){
        if(this.props.success){
          
          return(
            <form onSubmit={this.handleSubmit}>
            <div className="form-group col-md-4">
            <label >
          Enter the name of Dish: </label>
            <input
              id="dishName"
              type="text"
              ref={(input) => { this.dishName = input }}
              className="form-control"
              placeholder="Dish Name"
              required />
             
          </div>
        <label>
        <span>Select Ingredient</span> :{" "}
         
          <select id="123" value={this.state.value} onChange={this.handleChangeMultiple} multiple  native="true">
         
         
            {this.renderOptions()}
          
          
      
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
     
       );
      }
      else{
        //window.alert("Please Login to Access this Page")
        return (
          <div>
            <p>You must log in to view the page  
             </p>
            
          </div>
        );
      }
    }
}
export default GenerateQRC;
