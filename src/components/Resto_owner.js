import React, { Component } from 'react';


class Resto_owner extends Component {

  render() {
    if(this.props.success){
    return (
      <div id="content">
       
        
        <h2>Buy Product</h2>
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
            { this.props.products.map((product, key) => {
              
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
                  <td>
                    { !product.purchased
                      ? <button
                          name={product.id}
                          value={product.price}
                          powner={localStorage.getItem('username')}
                          onClick={(event) => {
                            this.props.purchaseProduct(event.target.name, event.target.value, event.target.powner)
                          }}
                        >
                          Buy
                        </button>
                      : null
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
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

export default Resto_owner;
