import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Purchased Products</h1>
        
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Brand</th>
              <th scope="col">Manufacturing Date</th>
              <th scope="col">Expiry Date</th>
              <th scope="col">Price per Unit</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.purchasedProducts.map((product, key) => {
              if(product.ownerName==localStorage.getItem('username')){
              return(
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>{product.ptype}</td>
                  <td>{product.brand}</td>
                  <td>{product.manudate}</td>
                  <td>{product.expdate}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                  <td>{product.owner}</td>
                  
                </tr>
              )
              }
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
