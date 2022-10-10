import React, { Component } from 'react';


class Farmer extends Component {

  render() {
    if(this.props.success){
    return (
      <div id="content">
        <h1>Add Product</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const type = this.productType.value
          const brand = this.productbrand.value
          const manudate = this.manudate.value
          const expdate = this.expdate.value
          const powner=localStorage.getItem('username')
          console.log(powner)
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.createProduct(name, type, brand,manudate, expdate, price, powner)
          
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Product Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productType"
              type="text"
              ref={(input) => { this.productType = input }}
              className="form-control"
              placeholder="Product Type"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productbrand"
              type="text"
              ref={(input) => { this.productbrand = input }}
              className="form-control"
              placeholder="Product brand"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="manufacturingdate"
              type="date"
              ref={(input) => { this.manudate = input }}
              className="form-control"
              placeholder="Manufacturing Date"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="expirydate"
              type="date"
              ref={(input) => { this.expdate = input }}
              className="form-control"
              placeholder="Expiry Date"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Product Price per unit"
              required />
          </div>
          <button type="submit" className="btn btn-primary" >Add Product</button>
        </form>
        
      </div>
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

export default Farmer;
